from rest_framework import serializers
from core.models.favorite_track import Favorite_Track

class FavoriteTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite_Track
        fields = ['id', 'favorite_id', 'track_id']