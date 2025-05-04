from django.db import models

from ..models.user import User
# from core.models.user import User
from django.core.validators import FileExtensionValidator

class Favorite(models.Model):
    name = models.CharField(max_length=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


    class Meta:
        db_table = 'favorite'
        verbose_name = 'Favorite'
        verbose_name_plural = 'Favorites'

    def __str__(self):
        return self.name

    @classmethod
    def create_favorite(cls, name, user_id):
        user = User.objects.get(id=user_id)
        favorite = cls(
            name=name,
            user=user,

        )
        favorite.save()
        return favorite