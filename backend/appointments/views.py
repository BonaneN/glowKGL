from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.utils import timezone
from .models import Appointment
from .serializers import AppointmentSerializer, AppointmentPreviewSerializer
from artists.models import ArtistAvailability

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user).order_by('-slot__date', '-slot__time')

    @action(detail=False, methods=['get'])
    def my_appointments(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def preview_summary(self, request):
        serializer = AppointmentPreviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        slot = serializer.validated_data['slot_obj']
        summary = {
            "professional": slot.artist.name,
            "brand": slot.artist.brand_name,
            "date": slot.date,
            "time": slot.time,
            "location": slot.artist.location,
            "service_id": request.data.get('service_id')
        }
        return Response(summary)

    @action(detail=False, methods=['post'])
    def book_session(self, request):
        with transaction.atomic():
            artist_id = request.data.get('artist')
            service_id = request.data.get('service')
            slot_id = request.data.get('slot')

            if not all([artist_id, service_id, slot_id]):
                return Response({"error": "artist, service, and slot are required"}, status=status.HTTP_400_BAD_REQUEST)

            slot = get_object_or_404(ArtistAvailability, id=slot_id, artist_id=artist_id)
            if slot.is_booked:
                return Response({"error": "This time slot is already booked."}, status=status.HTTP_400_BAD_REQUEST)

            appointment = Appointment.objects.create(
                user=request.user,
                artist_id=artist_id,
                service_id=service_id,
                slot=slot
            )

            slot.is_booked = True
            slot.save()

            return Response(AppointmentSerializer(appointment).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['patch'])
    def update_appointment(self, request, pk=None):
        appointment = self.get_object()
        new_slot_id = request.data.get('slot')

        if not new_slot_id:
            return Response({"error": "New slot ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            new_slot = get_object_or_404(ArtistAvailability, id=new_slot_id, artist=appointment.artist)
            
            if new_slot.is_booked:
                return Response({"error": "The new time slot is already booked."}, status=status.HTTP_400_BAD_REQUEST)

            old_slot = appointment.slot
            old_slot.is_booked = False
            old_slot.save()

            appointment.slot = new_slot
            appointment.save()

            new_slot.is_booked = True
            new_slot.save()

            return Response(AppointmentSerializer(appointment).data)

    @action(detail=True, methods=['post'])
    def cancel_appointment(self, request, pk=None):
        appointment = self.get_object()
        
        if appointment.status == 'Cancelled':
            return Response({"error": "Appointment is already cancelled"}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            appointment.status = 'Cancelled'
            appointment.save()

            slot = appointment.slot
            slot.is_booked = False
            slot.save()

            return Response({"message": "Appointment cancelled successfully, and time slot released."})
