from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from core.models.genre import Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']
        read_only_fields = ['id']


class GenreCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ['name']


    def create(self, validated_data):
        
        genre = Genre.create_genre(
            name=validated_data['name'],
        )
        return genre

