from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'phone_number')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.roles = ['client']
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """Used for /me endpoint — read and update profile."""
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone_number', 'profile_picture', 'roles')
        read_only_fields = ('id', 'username', 'roles')


class GlowKGLTokenSerializer(TokenObtainPairSerializer):
    """
    Custom JWT serializer that embeds `username` and `roles` directly
    into the access token payload — so the frontend never needs a
    separate /me call just to know who the user is.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['roles'] = user.roles
        token['email'] = user.email
        return token
