from allauth.account.models import EmailAddress


def set_primary_email(user):
    try:
        if user.email:
            email = EmailAddress.objects.get(user=user, email=user.email)
            email.set_as_primary(conditional=True)
        else:
            email = None

    except EmailAddress.DoesNotExist:
        email = EmailAddress.objects.create(user=user, email=user.email)
        email.set_as_primary(conditional=True)

    return email
