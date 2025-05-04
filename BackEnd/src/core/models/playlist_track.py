from django.db import models

from .playlist import Playlist
from .track import Track
from django.core.validators import FileExtensionValidator

class Playlist_Track(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, null=True, blank=True)
    track = models.ForeignKey(Track, on_delete=models.CASCADE, null=True, blank=True)
    
    



    class Meta:
        db_table = 'playlist_track'
        verbose_name = 'Playlist_Track'
        verbose_name_plural = 'Playlist_Tracks'

    def __str__(self):
        return self.playlist

    @classmethod
    def create_playlist_track(cls, playlist_id, track_id, ):
        playlist = Playlist.objects.get(id=playlist_id)
        track = Track.objects.get(id=track_id)
        playlist_track = cls(
            playlist=playlist,
            track=track,
            

        )
        playlist_track.save()
        return playlist_track