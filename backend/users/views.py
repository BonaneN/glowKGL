from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, UserProfileSerializer, GlowKGLTokenSerializer
from .models import User


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class GlowKGLTokenView(TokenObtainPairView):
    """Login view — returns access + refresh tokens with roles embedded."""
    serializer_class = GlowKGLTokenSerializer


class MeView(APIView):
    """
    GET  /users/me/  — return current user's profile
    PATCH /users/me/ — update phone_number or profile_picture
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
