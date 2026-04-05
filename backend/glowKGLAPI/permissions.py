from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Allow read to anyone. Write only to the object's creator (created_by field)."""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return getattr(obj, 'created_by', None) == request.user


class IsArtistOwnerOrReadOnly(permissions.BasePermission):
    """Allow read to anyone. Write only to the artist's creator."""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.artist.created_by == request.user


class IsAdminRole(permissions.BasePermission):
    """
    Grants access only to users whose roles list contains 'admin'.
    Admin accounts are created manually via the Django shell — never auto-assigned.
    """
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.has_role('admin')
        )
