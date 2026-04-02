from django.db import models
from django.conf import settings
from artists.models import Artist, ArtistAvailability
from services.models import Service

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='appointments')
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='appointments')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='appointments')
    slot = models.OneToOneField(ArtistAvailability, on_delete=models.CASCADE, related_name='appointment')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Confirmed')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.artist.name} - {self.slot.date} @ {self.slot.time}"
