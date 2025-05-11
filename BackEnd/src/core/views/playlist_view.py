from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.playlist import Playlist
from ..serializers.playlist_serializer import (
    PlaylistSerializer, 
    
)
from django.db import IntegrityError


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    
    @action(detail=True, methods=['get'])
    def get_playlists_by_user(self, request, pk=None):
        playlists = Playlist.objects.filter(user_id=pk)
        serializer = PlaylistSerializer(playlists, many=True)
        if serializer.data:
            return Response({
                'playlists': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get playlists  is failed'
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'])
    def get_playlist_by_id(self, request, pk=None):
        playlist = self.get_object()
        serializer = PlaylistSerializer(playlist)
        if serializer.data:
            return Response({
                'playlist': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get playlist is failed'
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def add_playlist(self, request, pk=None):
        namePlaylist = f"Danh sách phát của tôi #{Playlist.objects.count() + 1}"
        image_file_path = request.data.get("image_file_path")
        playlist = Playlist.create_playlist(namePlaylist, pk, image_file_path)
        serializer = PlaylistSerializer(playlist)
        if serializer.data:
            return Response({
                'success': True,
                'playlist': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Create playlist is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def update_playlist(self, request, pk=None):
        playlist = self.get_object()
        serializer = self.get_serializer(playlist, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'playlist': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Update playlist is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def delete_playlist(self, request, pk=None):
        playlist = self.get_object()
        deleted_count, _ = playlist.delete()
        if deleted_count > 0:
            return Response({
                'success': True,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Delete playlist is failed'
        }, status=status.HTTP_400_BAD_REQUEST)


            
    
