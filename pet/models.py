from django.db import models

from petowner.models import PetOwner


# Create your models here.
class PetModel(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    breed = models.CharField(max_length=255)
    birthdate = models.DateField()
    image = models.ImageField(upload_to='images/', default='images/pet-logo.png')
    serial_number = models.CharField(max_length=255, unique=True)
    petowner = models.ForeignKey(PetOwner, on_delete=models.CASCADE, related_name='pets')

    def __str__(self):
        return self.name


class PetTemperatureModel(models.Model):
    pet = models.ForeignKey(PetModel, on_delete=models.CASCADE, related_name='temperatures')
    temperature = models.DecimalField(max_digits=25, decimal_places=10)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)


class PetCoordinateModel(models.Model):
    pet = models.ForeignKey(PetModel, on_delete=models.CASCADE, related_name='coordinates')
    latitude = models.DecimalField(max_digits=25, decimal_places=10)
    longitude = models.DecimalField(max_digits=25, decimal_places=10)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
