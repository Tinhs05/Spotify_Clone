from rest_framework import serializers
from core.models.playlist import Playlist

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ['id', 'name', 'user_id', 'image_file_path']