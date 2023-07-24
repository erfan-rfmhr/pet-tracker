from django.db import models

from petowner.models import PetOwner


# Create your models here.
class PetModel(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    breed = models.CharField(max_length=255)
    age = models.IntegerField()
    birthdate = models.DateField()
    petowner = models.ForeignKey(PetOwner, on_delete=models.CASCADE, related_name='pets')

    def __str__(self):
        return self.name
