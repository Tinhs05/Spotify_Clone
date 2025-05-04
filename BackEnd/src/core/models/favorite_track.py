from django.db import models

from .favorite import Favorite
from .track import Track
from django.core.validators import FileExtensionValidator

class Favorite_Track(models.Model):
    favorite = models.ForeignKey(Favorite, on_delete=models.CASCADE, null=True, blank=True)
    track = models.ForeignKey(Track, on_delete=models.CASCADE, null=True, blank=True)
    
    



    class Meta:
        db_table = 'favorite_track'
        verbose_name = 'Favorite_Track'
        verbose_name_plural = 'Favorite_Tracks'

    def __str__(self):
        return self.favorite

    @classmethod
    def create_favorite_track(cls, favorite_id, track_id, ):
        favorite = Favorite.objects.get(id=favorite_id)
        track = Track.objects.get(id=track_id)
        favorite_track = cls(
            favorite=favorite,
            track=track,
        )
        favorite_track.save()
        return favorite_track