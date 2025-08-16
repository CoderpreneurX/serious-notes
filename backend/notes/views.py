from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "slug"  # <-- allows retrieving notes by slug

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_pin(self, request, slug=None):
        """Toggle pin/unpin a note and record pin time."""
        note = self.get_object()
        if note.pinned:
            note.pinned = False
            note.pinned_at = None
        else:
            note.pinned = True
            note.pinned_at = timezone.now()
        note.save()
        return Response(NoteSerializer(note).data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def pinned(self, request):
        """List only pinned notes for the user."""
        notes = self.get_queryset().filter(pinned=True).order_by('-pinned_at')
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)
