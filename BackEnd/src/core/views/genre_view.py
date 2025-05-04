from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.genre import Genre
from ..models.track import Track
from ..serializers.genre_serializer import (
    GenreSerializer, 
    GenreCreateSerializer,
)
from ..serializers.track_serializer import (
    TrackSerializer, 
    TrackCreateSerializer,
)

from django.db import IntegrityError


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    

    @action(detail=False, methods=['get'])
    def get_genres(self, request):
        genres = Genre.objects.filter(track__isnull=False).distinct() 
        serializer = GenreSerializer(genres, many=True)
        if serializer.data:
            return Response({
                'success': True,
                'genres': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get genres is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_genre_by_id(self, request, pk=None):
        genre = self.get_object()
        serializer = GenreSerializer(genre)
        if serializer.data:
            return Response({
                'genre': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get genre is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_tracks_by_genre(self, request, pk=None):
        genre = self.get_object()
        tracks = Track.objects.filter(genre=genre)
        serializer = TrackSerializer(tracks, many=True)
        if serializer.data:
            return Response({
                'success': True,
                'tracks': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get tracks is failed'
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def add_genre(self, request):
        serializer = GenreCreateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                genre = serializer.save()
                return Response({
                    'success': True,
                    'genre': GenreSerializer(genre).data,
                }, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({
                    'error': 'This genre already exists'
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
