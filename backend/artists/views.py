from rest_framework import viewsets, permissions, filters, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Artist, ArtistAvailability, ArtistCategory
from .serializers import ArtistSerializer, ArtistAvailabilitySerializer, ArtistCategorySerializer
from glowKGLAPI.permissions import IsOwnerOrReadOnly, IsAdminRole


class ArtistCategoryViewSet(viewsets.ModelViewSet):
    queryset = ArtistCategory.objects.all()
    serializer_class = ArtistCategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_permissions(self):
        # Anyone can list/retrieve artist categories
        # Only admins can create, update, or delete
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminRole()]
        return [permissions.AllowAny()]


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'brand_name', 'location']

    def get_queryset(self):
        queryset = super().get_queryset()
        location = self.request.query_params.get('location')
        home_service = (
            self.request.query_params.get('home_service') or
            self.request.query_params.get('services__is_home_service') or
            self.request.query_params.get('is_home_service')
        )
        day_name = self.request.query_params.get('day')

        if location:
            queryset = queryset.filter(location__icontains=location)
        if home_service:
            is_home = home_service.lower() == 'true'
            queryset = queryset.filter(services__is_home_service=is_home).distinct()
        if day_name:
            days = {
                'sunday': 1, 'monday': 2, 'tuesday': 3, 'wednesday': 4,
                'thursday': 5, 'friday': 6, 'saturday': 7
            }
            day_num = days.get(day_name.lower())
            if day_num:
                queryset = queryset.filter(available_slots__date__week_day=day_num).distinct()

        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(created_by=user)
        # Add artist role without removing seller or any other existing role
        user.add_role('artist')

    @action(detail=True, methods=['get'], permission_classes=[permissions.AllowAny])
    def available_slots(self, request, pk=None):
        artist = self.get_object()
        date = request.query_params.get('date')
        if date:
            slots = artist.available_slots.filter(date=date, is_booked=False)
        else:
            slots = artist.available_slots.filter(is_booked=False)
        serializer = ArtistAvailabilitySerializer(slots, many=True)
        return Response(serializer.data)


class ArtistAvailabilityViewSet(viewsets.ModelViewSet):
    serializer_class = ArtistAvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return ArtistAvailability.objects.all()
        return ArtistAvailability.objects.filter(artist__created_by=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        artist = user.artist_profiles.first()
        if not artist:
            raise serializers.ValidationError({"detail": "You must create an Artist profile first."})
        serializer.save(artist=artist)
