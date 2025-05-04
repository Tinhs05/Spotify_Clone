from django.db import models

from ..models.genre import Genre
from django.core.validators import FileExtensionValidator

class Track(models.Model):
    title = models.CharField(max_length=150, unique=True)
    duration = models.IntegerField()
    artist = models.CharField(max_length=150)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, null=True, blank=True)
    audio_file_path = models.CharField(max_length=255, blank=True, null=True)
    video_file_path = models.CharField(max_length=255, blank=True, null=True)
    image_file_path = models.CharField(max_length=255, blank=True, null=True)
    is_premium = models.IntegerField(default=0)



    class Meta:
        db_table = 'track'
        verbose_name = 'Track'
        verbose_name_plural = 'Tracks'

    def __str__(self):
        return self.title

    @classmethod
    def create_track(cls, title, duration, artist, genre_id, audio_file_path, video_file_path, image_file_path, is_premium):
        genre = Genre.objects.get(id=genre_id)
        track = cls(
            title=title,
            duration=duration,
            artist=artist,
            genre=genre,
            audio_file_path=audio_file_path,
            video_file_path=video_file_path,
            image_file_path=image_file_path,
            is_premium=is_premium,

        )
        track.save()
        return track