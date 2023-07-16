from django.db import models

from core.models import CoreUser


# Create your models here.
class VeterinarianModel(models.Model):
    user = models.OneToOneField(CoreUser, on_delete=models.CASCADE)
