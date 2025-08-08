from dj_rest_auth.serializers import PasswordResetSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
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
