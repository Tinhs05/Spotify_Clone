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

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return TrackCreateSerializer
        return TrackSerializer

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
        try:
            track = Track.objects.get(pk=pk)
            serializer = TrackSerializer(track)
            return Response({
                'track': serializer.data,
            }, status=status.HTTP_200_OK)
        except Track.DoesNotExist:
            return Response({
                'error': 'Track not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def get_video_list(self, request):
        videoList = Track.objects.filter(Q(video_file_path__isnull=False) & ~Q(video_file_path=''))
        serializer = TrackSerializer(videoList, many=True)
        return Response({
            'videoList': serializer.data,
        }, status=status.HTTP_200_OK)
    
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
                track = serializer.save()
                return Response({
                    'success': True,
                    'track': TrackSerializer(track).data,
                }, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({
                    'error': 'This track already exists'
                }, status=status.HTTP_400_BAD_REQUEST)
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
