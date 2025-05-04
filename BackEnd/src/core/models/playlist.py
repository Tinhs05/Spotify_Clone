from django.db import models

from ..models.user import User
from django.core.validators import FileExtensionValidator

class Playlist(models.Model):
    name = models.CharField(max_length=150, unique=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    image_file_path = models.CharField(max_length=255, blank=True, null=True)



    class Meta:
        db_table = 'playlist'
        verbose_name = 'Playlist'
        verbose_name_plural = 'Playlists'

    def __str__(self):
        return self.name

    @classmethod
    def create_playlist(cls, name, user_id, image_file_path):
        user = User.objects.get(id=user_id)
        playlist = cls(
            name=name,
            user=user,
            image_file_path=image_file_path,

        )
        playlist.save()
        return playlist