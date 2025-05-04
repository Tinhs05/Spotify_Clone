from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.favorite import Favorite
from ..serializers.favorite_serializer import (
    FavoriteSerializer, 
    
)
from django.db import IntegrityError


class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    
    
    @action(detail=True, methods=['get'])
    def get_favorite_by_user_id(self, request, pk=None):
        try:
            favorite = Favorite.objects.get(user_id=pk)
            serializer = self.get_serializer(favorite)
            return Response({
                'favorite': serializer.data,
            }, status=status.HTTP_200_OK)
        except Favorite.DoesNotExist:
            return Response({
                'error': "Get favorite is failed",
            }, status=status.HTTP_200_OK)


    @action(detail=True, methods=['post'])
    def add_favorite(self, request, pk=None):
        nameFavorite = "Bài hát đã thích";
        favorite = Favorite.create_favorite(nameFavorite, pk)
        serializer = FavoriteSerializer(favorite)
        if serializer.data:
            return Response({
                'success': True,
                'favorite': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response({
            'error': 'Create favorite is failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    


            
    
