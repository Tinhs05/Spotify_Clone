from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, BasePermission
from django.contrib.auth.hashers import make_password, check_password
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

class IsRoleAdminOrDjangoAdmin(BasePermission):
    """
    Cho phép truy cập nếu user là admin Django (is_staff, is_superuser) HOẶC user có trường role = 1 (admin).
    """
    def has_permission(self, request, view):
        user = request.user
        return bool(user and (getattr(user, 'role', 0) == 1 or user.is_staff or user.is_superuser))

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_permissions(self):
        if self.action in ['create', 'login', 'register', 'request_password_reset', 'confirm_password_reset', 'get_users', 'list']:
            return [AllowAny()]
        elif self.action in ['retrieve']:
            return [AllowAny()]
        elif self.action in ['destroy', 'update', 'partial_update']:
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'])
    def get_users(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        if serializer.data:
            return Response({
                'users': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get users is failed'
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'success': True,
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


        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        if check_password(password, user.password):
            refresh = RefreshToken.for_user(user)
            serializer = self.get_serializer(user)
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
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

    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def update_premium_status(self, request, pk=None):
        user = self.get_object()
        is_premium = request.data.get('is_premium')
        if is_premium is not None:
            user.is_premium = is_premium
            user.save()
            serializer = self.get_serializer(user)
            return Response({
                'success': True,
                'user': serializer.data
            })
        return Response({
            'error': 'is_premium field is required'
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'])
    def update_profile_image(self, request, pk=None):
        user = self.get_object()
        profile_image = request.FILES.get('profile_image')
        if profile_image:
            if user.update_profile_image(profile_image):
                serializer = self.get_serializer(user)
                return Response(serializer.data)
            return Response({
                'error': 'Failed to upload profile image'
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'error': 'No profile image provided'
        }, status=status.HTTP_400_BAD_REQUEST)