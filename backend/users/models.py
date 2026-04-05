from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # email is required and unique
    email = models.EmailField(unique=True)

    # Replaces the old single `role` field.
    # A user can hold multiple roles simultaneously, e.g. ["client", "seller", "artist"]
    # Admin is ["admin"] — set manually, never auto-assigned.
    roles = models.JSONField(default=list)

    # Profile fields
    phone_number = models.CharField(max_length=20, blank=True, default='')
    profile_picture = models.ImageField(upload_to='glowkgl/users/', blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({', '.join(self.roles)})"

    def has_role(self, role):
        """Check if user has a specific role."""
        return role in self.roles

    def add_role(self, role):
        """Add a role if not already present and save."""
        if role not in self.roles:
            self.roles.append(role)
            self.save(update_fields=['roles'])

    @property
    def is_admin(self):
        return 'admin' in self.roles
