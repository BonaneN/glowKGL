from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Registration endpoint
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# Login endpoint
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)