from rest_framework import serializers
from .models import Service
from artists.models import ArtistCategory

class ServiceSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field='name', queryset=ArtistCategory.objects.all()
    )
    
    class Meta:
        model = Service
        fields = ['id', 'category', 'is_home_service']
