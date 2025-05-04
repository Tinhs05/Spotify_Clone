from rest_framework import serializers
from core.models.track import Track

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ['id', 'title', 'duration', 'artist', 'genre_id', 'audio_file_path', 'video_file_path', 'image_file_path', 'is_premium']


class TrackCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Track
        fields = ['name']


    def create(self, validated_data):
        
        track = Track.create_track(
            name=validated_data['name'],
        )
        return track

