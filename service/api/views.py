from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['post'])
    def add_track(self, request, pk=None):
        playlist = self.get_object()
        track_id = request.data.get('track_id')
        
        if not track_id:
            return Response({'error': 'track_id is required'}, status=400)
            
        try:
            track = models.Track.objects.get(id=track_id)
        except models.Track.DoesNotExist:
            return Response({'error': 'Track not found'}, status=404)
            
        playlist.tracks.add(track)
        return Response({'message': 'Track added successfully'}, status=200)
