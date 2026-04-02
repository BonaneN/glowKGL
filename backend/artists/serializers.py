from rest_framework import serializers
from .models import Artist, ArtistAvailability, ArtistCategory
from services.serializers import ServiceSerializer
from services.models import Service

class ArtistCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistCategory
        fields = ['id', 'name', 'slug']

class ArtistAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistAvailability
        fields = ['id', 'date', 'time', 'is_booked']
        read_only_fields = ['is_booked']

class ArtistSerializer(serializers.ModelSerializer):
    available_slots = ArtistAvailabilitySerializer(many=True, required=False)
    services = ServiceSerializer(many=True, required=False)
    created_by = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = Artist
        fields = [
            'id', 'name', 'brand_name', 'phone', 'whatsapp_contact', 
            'location', 'profile_picture', 'instagram', 'tiktok', 'created_by',
            'available_slots', 'services', 'created_at'
        ]
        read_only_fields = ['created_at']

    def create(self, validated_data):
        available_slots_data = validated_data.pop('available_slots', [])
        services_data = validated_data.pop('services', [])
        validated_data['created_by'] = self.context['request'].user
        artist = Artist.objects.create(**validated_data)

        for service_data in services_data:
            Service.objects.create(artist=artist, **service_data)
            
        for slot_data in available_slots_data:
            ArtistAvailability.objects.create(artist=artist, **slot_data)
            
        return artist
