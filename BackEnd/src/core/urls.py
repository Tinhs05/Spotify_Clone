from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views.user_view import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 