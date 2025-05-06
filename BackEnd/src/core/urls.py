from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views.user_view import UserViewSet
from core.views.genre_view import GenreViewSet
from core.views.track_view import TrackViewSet
from core.views.playlist_view import PlaylistViewSet
from core.views.playlist_track_view import PlaylistTrackViewSet
from core.views.favorite_view import FavoriteViewSet
from core.views.favorite_track_view import FavoriteTrackViewSet
from core.views.s3_upload_view import UploadToS3View

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'genres', GenreViewSet)
router.register(r'tracks', TrackViewSet)
router.register(r'playlists', PlaylistViewSet)
router.register(r'playlist_tracks', PlaylistTrackViewSet)
router.register(r'favorites', FavoriteViewSet)
router.register(r'favorite_tracks', FavoriteTrackViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload-to-s3/', UploadToS3View.as_view(), name='upload-to-s3'),
] 