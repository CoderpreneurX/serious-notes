from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings


class CustomAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        """
        Returns the frontend URL that will be used in the email.
        """
        frontend_url = settings.FRONTEND_URL  # e.g., "http://localhost:3000"
        key = emailconfirmation.key
        return f"{frontend_url}/confirm-email/{key}"
