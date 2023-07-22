from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class CoreUser(AbstractUser):
    is_customer = models.BooleanField(default=True)
