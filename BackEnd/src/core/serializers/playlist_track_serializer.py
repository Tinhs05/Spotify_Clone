from rest_framework import serializers
from core.models.playlist_track import Playlist_Track

class PlaylistTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist_Track
        fields = ['id', 'playlist_id', 'track_id']