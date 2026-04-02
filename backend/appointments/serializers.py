from rest_framework import serializers
from .models import Appointment
from artists.models import ArtistAvailability
from artists.serializers import ArtistSerializer
from services.serializers import ServiceSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    artist_details = ArtistSerializer(source='artist', read_only=True)
    service_details = ServiceSerializer(source='service', read_only=True)
    date = serializers.DateField(source='slot.date', read_only=True)
    time = serializers.TimeField(source='slot.time', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'user', 'username', 'artist', 'artist_details', 
            'service', 'service_details', 'slot', 'date', 'time', 
            'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'artist', 'service', 'created_at', 'updated_at']

class AppointmentPreviewSerializer(serializers.Serializer):
    artist_id = serializers.IntegerField()
    service_id = serializers.IntegerField()
    slot_id = serializers.IntegerField()

    def validate(self, data):
        try:
            slot = ArtistAvailability.objects.get(id=data['slot_id'], artist_id=data['artist_id'], is_booked=False)
        except ArtistAvailability.DoesNotExist:
            raise serializers.ValidationError("This time slot is either not found or already booked.")
        
        data['slot_obj'] = slot
        return data
