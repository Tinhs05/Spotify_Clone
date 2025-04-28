from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.contrib.auth.hashers import make_password

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    profile_image_path = models.CharField(max_length=255, blank=True, null=True)
    is_premium = models.BooleanField(default=False)
    role = models.BooleanField(default=False)

    class Meta:
        db_table = 'user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username

    @classmethod
    def create_user(cls, username, email, password):
        user = cls(
            username=username,
            email=email,
            password=make_password(password)
        )
        user.save()
        return user
