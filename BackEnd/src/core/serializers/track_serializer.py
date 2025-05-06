from rest_framework import serializers
from core.models.track import Track
from core.models.genre import Genre
from core.serializers.genre_serializer import GenreSerializer

class TrackSerializer(serializers.ModelSerializer):
    genre = GenreSerializer()

    class Meta:
        model = Track
        fields = ['id', 'title', 'duration', 'artist', 'genre', 'audio_file_path', 'video_file_path', 'image_file_path', 'is_premium']
        read_only_fields = ['id']


class TrackCreateSerializer(serializers.ModelSerializer):
    genre = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), required=True)

    class Meta:
        model = Track
        fields = ['title', 'duration', 'artist', 'genre', 'audio_file_path', 'video_file_path', 'image_file_path', 'is_premium']

    def create(self, validated_data):
        print("validated_data:", validated_data)  # Debug log
        track = Track.objects.create(
            title=validated_data['title'],
            duration=validated_data['duration'],
            artist=validated_data['artist'],
            genre=validated_data['genre'],
            audio_file_path=validated_data.get('audio_file_path'),
            video_file_path=validated_data.get('video_file_path'),
            image_file_path=validated_data.get('image_file_path'),
            is_premium=validated_data.get('is_premium', 0)
        )
        return track

