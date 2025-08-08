from django.urls import path, include

from .views import GoogleLogin, GitHubLogin

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("registration/", include("dj_rest_auth.registration.urls")),
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path("github/", GitHubLogin.as_view(), name="github_connect"),
    path("accounts/", include("allauth.urls")),
]
