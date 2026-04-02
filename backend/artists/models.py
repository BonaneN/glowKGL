from django.db import models
from django.conf import settings

class ArtistCategory(models.Model):
    CATEGORY_CHOICES = [
        ("Makeup", "Makeup"),
        ("Hair", "Hair"),
        ("Nails", "Nails"),
        ("Spa & Massage", "Spa & Massage"),
        ("Skincare", "Skincare"),
        ("Henna", "Henna"),
        ("Barber", "Barber"),
        ("Lashes & Brows", "Lashes & Brows"),
    ]
    name = models.CharField(max_length=100, unique=True, choices=CATEGORY_CHOICES)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.name.lower().replace(' ', '-')
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Artist(models.Model):
    name = models.CharField(max_length=255)
    brand_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    whatsapp_contact = models.CharField(max_length=20, blank=True, null=True)
    location = models.CharField(max_length=255)
    instagram = models.URLField(blank=True, null=True)
    tiktok = models.URLField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='artist_profiles/', blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='artist_profiles')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.brand_name or self.name

class ArtistAvailability(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='available_slots')
    date = models.DateField()
    time = models.TimeField()
    is_booked = models.BooleanField(default=False)

    class Meta:
        unique_together = ('artist', 'date', 'time')
        ordering = ['date', 'time']

    def __str__(self):
        return f"{self.artist} - {self.date} @ {self.time}"
