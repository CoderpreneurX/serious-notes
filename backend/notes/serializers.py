from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "pinned",
            "pinned_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["slug", "pinned_at", "created_at", "updated_at"]
