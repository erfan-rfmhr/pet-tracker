from django.db import models

from core.models import CoreUser


# Create your models here.
class PetOwner(models.Model):
    user = models.OneToOneField(CoreUser, on_delete=models.CASCADE, related_name='petowner')
    phone = models.CharField(max_length=12)
    address = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/', default='images/default.png')
