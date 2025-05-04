from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.playlist_track import Playlist_Track
from ..serializers.playlist_track_serializer import (
    PlaylistTrackSerializer, 
    
)
from ..serializers.track_serializer import (
    TrackSerializer, 
    
)
from django.db import IntegrityError


class PlaylistTrackViewSet(viewsets.ModelViewSet):
    queryset = Playlist_Track.objects.all()
    serializer_class = PlaylistTrackSerializer
    
    @action(detail=True, methods=['get'])
    def get_playlist_tracks(self, request, pk=None):
        playlist_tracks = Playlist_Track.objects.filter(playlist_id=pk)
        tracks = [pt.track for pt in playlist_tracks if pt.track is not None]
        serializer = TrackSerializer(tracks, many=True)
        if serializer.data:
            return Response({
                'playlist_tracks': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get playlist_tracks  is failed'
        }, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['post'])
    def add_playlist_track(self, request):
        playlist_id = request.data.get("idPlaylist")
        track_id = request.data.get("idTrack")
        playlist_track = Playlist_Track.create_playlist_track(playlist_id, track_id)
        serializer = PlaylistTrackSerializer(playlist_track)
        if serializer.data:
            return Response({
                'success': True,
                'playlist_track': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Create playlist_track is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def delete_playlist_track(self, request):
        playlist_id = request.data.get("idPlaylist")
        track_id = request.data.get("idTrack")
        deleted, _ = Playlist_Track.objects.filter(
            playlist_id=playlist_id, track_id=track_id
        ).delete()
        if deleted:
            return Response({
                'success': True
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Delete playlist_track is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    

            
    
