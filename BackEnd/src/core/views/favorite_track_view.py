from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.favorite_track import Favorite_Track
from ..serializers.favorite_track_serializer import (
    FavoriteTrackSerializer, 
    
)
from ..serializers.track_serializer import (
    TrackSerializer, 
    
)
from django.db import IntegrityError


class FavoriteTrackViewSet(viewsets.ModelViewSet):
    queryset = Favorite_Track.objects.all()
    serializer_class = FavoriteTrackSerializer
    
    @action(detail=True, methods=['get'])
    def get_favorite_tracks(self, request, pk=None):
        favorite_tracks = Favorite_Track.objects.filter(favorite_id=pk)
        tracks = [pt.track for pt in favorite_tracks if pt.track is not None]
        serializer = TrackSerializer(tracks, many=True)
        if serializer.data:
            return Response({
                'favorite_tracks': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get favorite_tracks  is failed'
        }, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['post'])
    def add_favorite_track(self, request):
        favorite_id = request.data.get("idFavorite")
        track_id = request.data.get("idTrack")
        favorite_track = Favorite_Track.create_favorite_track(favorite_id, track_id)
        serializer = FavoriteTrackSerializer(favorite_track)
        if serializer.data:
            return Response({
                'success': True,
                'favorite_track': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Create favorite_track is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def delete_favorite_track(self, request):
        favorite_id = request.data.get("idFavorite")
        track_id = request.data.get("idTrack")
        deleted, _ = Favorite_Track.objects.filter(
            favorite_id=favorite_id, track_id=track_id
        ).delete()
        if deleted:
            return Response({
                'success': True
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Delete playlist_track is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    

            
    
