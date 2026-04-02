from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has a `created_by` attribute.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `created_by`.
        return getattr(obj, 'created_by', None) == request.user

class IsArtistOwnerOrReadOnly(permissions.BasePermission):
    
    # Permission for objects related to an Artist (like Services).
    # Checks if the artist's creator matches the request user.
  
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.artist.created_by == request.user
