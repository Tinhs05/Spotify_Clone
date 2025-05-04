from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.track import Track
from ..models.genre import Genre
from django.db.models import Q
from ..serializers.track_serializer import (
    TrackSerializer, 
    TrackCreateSerializer,
    
)
from django.db import IntegrityError


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

    @action(detail=False, methods=['get'])
    def get_tracks(self, request):
        tracks = Track.objects.all()
        serializer = TrackSerializer(tracks, many=True)
        if serializer.data:
            return Response({
                'tracks': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get tracks  is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_track_by_id(self, request, pk=None):
        track = self.get_object()
        serializer = TrackSerializer(track)
        if serializer.data:
            return Response({
                'track': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get track is failed'
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def get_video_list(self, request):
        videoList = Track.objects.filter(Q(video_file_path__isnull=False) & ~Q(video_file_path=''))
        serializer = TrackSerializer(videoList, many=True)
        if serializer.data:
            return Response({
                'videoList': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get videoList is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_video_by_id(self, request, pk=None):
        video = Track.objects.get(Q(pk=pk) & Q(video_file_path__isnull=False) & ~Q(video_file_path=''))
        serializer = TrackSerializer(video)
        if serializer.data:
            return Response({
                'video': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Get videoList is failed'
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def add_track(self, request):
        serializer = TrackCreateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                genre = serializer.save()
                return Response({
                    'success': True,
                    'genre': TrackSerializer(genre).data,
                }, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({
                    'error': 'This genre already exists'
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
