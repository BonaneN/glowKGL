from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# Serializer for registering a new user
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')

# Validate that the two passwords match
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password don't match."})
        return attrs

# Method to create a new user
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
            role = 'client'
        )

# Set the user's password
        user.set_password(validated_data['password'])
        user.save()
        return user
    
# Serializer for login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)                  
    password = serializers.CharField(write_only=True, required=True)
    access = serializers.CharField(read_only=True)                      
    refresh = serializers.CharField(read_only=True)

# Validate user credentials and return tokens
    def validate(self, attrs):
        user = authenticate(username=attrs['username'], password=attrs['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials!!!")
        refresh = RefreshToken.for_user(user)

        return {
            'username': user.username,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }