from rest_framework import serializers
from core.models.favorite import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'name', 'user_id']