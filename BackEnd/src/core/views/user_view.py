from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from ..models.user import User
from ..serializers.user_serializer import (
    UserSerializer, 
    UserCreateSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
    PremiumRegistrationSerializer
)
from django.db import IntegrityError
import random
import string
from django.core.mail import send_mail
from django.conf import settings

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create', 'login', 'register', 'request_password_reset', 'confirm_password_reset']:
            return [AllowAny()]
        elif self.action in ['list', 'retrieve']:
            return [IsAdminUser()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': UserSerializer(user).data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({
                    'error': 'Username or email already exists'
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({
                'error': 'Please provide both username and password'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            serializer = self.get_serializer(user)
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def request_password_reset(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                # Generate a random token
                token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
                # In a real application, you would save this token to the database with an expiry time
                # For now, we'll just send it in the email
                
                # Send email with reset link
                reset_link = f"http://your-frontend-url/reset-password?token={token}"
                send_mail(
                    'Password Reset Request',
                    f'Click the following link to reset your password: {reset_link}',
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                return Response({
                    'message': 'Password reset link has been sent to your email'
                })
            except User.DoesNotExist:
                # Don't reveal that the email doesn't exist
                return Response({
                    'message': 'If an account exists with this email, you will receive a password reset link'
                })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def confirm_password_reset(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            new_password = serializer.validated_data['new_password']
            
            # In a real application, you would verify the token from the database
            # For now, we'll just update the password
            try:
                # Find user by token (in real app, you'd have a token model)
                user = User.objects.get(email=request.data.get('email'))
                user.set_password(new_password)
                user.save()
                return Response({
                    'message': 'Password has been reset successfully'
                })
            except User.DoesNotExist:
                return Response({
                    'error': 'Invalid or expired token'
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def register_premium(self, request, pk=None):
        user = self.get_object()
        serializer = PremiumRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            # In a real application, you would:
            # 1. Validate the payment information
            # 2. Process the payment
            # 3. Update the user's premium status
            # 4. Send a confirmation email
            
            # For now, we'll just update the premium status
            user.is_premium = True
            user.save()
            
            return Response({
                'message': 'Premium registration successful',
                'user': UserSerializer(user).data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'])
    def update_profile(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'])
    def update_premium_status(self, request, pk=None):
        user = self.get_object()
        is_premium = request.data.get('is_premium')
        if is_premium is not None:
            user.is_premium = is_premium
            user.save()
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        return Response({
            'error': 'is_premium field is required'
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'])
    def update_profile_image(self, request, pk=None):
        user = self.get_object()
        profile_image = request.FILES.get('profile_image')
        if profile_image:
            # Handle file upload and save path
            # This is a placeholder - implement actual file handling logic
            user.profile_image_path = f"profile_images/{user.id}/{profile_image.name}"
            user.save()
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        return Response({
            'error': 'No profile image provided'
        }, status=status.HTTP_400_BAD_REQUEST)
