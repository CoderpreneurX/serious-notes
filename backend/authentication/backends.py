from allauth.account.auth_backends import AuthenticationBackend
from allauth.account.utils import filter_users_by_email


class CustomAuthenticationBackend(AuthenticationBackend):
    def _authenticate(self, request, **credentials):
        username = credentials.get("username")
        email = credentials.get("email")
        password = str(credentials.get("password"))
        if username:
            user = self._authenticate_by_email(username, password)
            if user:
                return user

            user = self._authenticate_by_username(username, password)
            if user:
                return user

        if email:
            user = self._authenticate_by_email(email, password)
            if user:
                return user

        return None

    def _authenticate_by_email(self, email: str, password: str):
        users = filter_users_by_email(email, prefer_verified=True)
        for user in users:
            if self._check_password(user, password):
                return user
        return None
