from allauth.account.adapter import (
    DefaultAccountAdapter,
    get_adapter as get_account_adapter,
)
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from .utils import set_primary_email


class CustomAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        """
        Returns the frontend URL that will be used in the email.
        """
        frontend_url = settings.FRONTEND_URL
        key = emailconfirmation.key
        return f"{frontend_url}/confirm-email/{key}"


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def save_user(self, request, sociallogin, form=None):
        u = sociallogin.user
        u.set_unusable_password()
        account_adapter = get_account_adapter()
        if form:
            account_adapter.save_user(request, u, form)
        else:
            account_adapter.populate_username(request, u)
        sociallogin.save(request, connect=True)

        set_primary_email(user=u)

        return u
