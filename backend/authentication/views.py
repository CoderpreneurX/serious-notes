import os
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from dotenv import load_dotenv
from .client import ScopedOAuth2Client

load_dotenv()


def get_redirect_url(provider: str, default_url: str) -> str:
    """Fetch redirect_url from SocialApp.settings, or fall back to default."""
    try:
        app = SocialApp.objects.get(provider=provider)
        return app.settings.get("redirect_url", default_url)
    except (SocialApp.DoesNotExist, Exception):
        return default_url


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = ScopedOAuth2Client
    callback_url = get_redirect_url(
        "google",
        f"{os.getenv("BACKEND_DOMAIN", "http://localhost:8000")}/accounts/google/login/callback/",
    )


class GitHubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    client_class = ScopedOAuth2Client
    callback_url = get_redirect_url(
        "github", f"{os.getenv("FRONTEND_URL", "http://localhost:5173")}/auth/sign-in/github"
    )
