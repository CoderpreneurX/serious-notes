from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from django.utils import timezone


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    title = models.CharField(max_length=255)
    slug = models.SlugField(blank=True)  # unique per user, not globally
    content = RichTextField()
    pinned = models.BooleanField(default=False)
    pinned_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'title'], name='unique_note_title_per_user'),
            models.UniqueConstraint(fields=['user', 'slug'], name='unique_note_slug_per_user'),
        ]
        ordering = ['-pinned', '-pinned_at', '-updated_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Note.objects.filter(user=self.user, slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug

        if self.pinned and self.pinned_at is None:
            self.pinned_at = timezone.now()
        elif not self.pinned:
            self.pinned_at = None

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.user.username})"
