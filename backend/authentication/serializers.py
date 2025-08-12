from dj_rest_auth.serializers import PasswordResetSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer, get_adapter
from allauth.account.models import EmailAddress
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from django.conf import settings


class CustomPasswordResetSerializer(PasswordResetSerializer):
    def get_email_options(self):
        return {
            "extra_email_context": {
                "frontend_url": f"{settings.FRONTEND_URL}/reset-password"
            }
        }


class PatchedRegisterSerializer(RegisterSerializer):
    def _has_phone_field(self):
        return False

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if email and EmailAddress.objects.is_verified(email):
            raise serializers.ValidationError(
                _("A user is already registered with this e-mail address."),
            )
        return email
