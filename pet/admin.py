from django.contrib import admin

from .models import PetModel, PetTemperatureModel, PetCoordinateModel

# Register your models here.
admin.site.register(PetModel)
admin.site.register(PetTemperatureModel)


@admin.register(PetCoordinateModel)
class PetCoordinateModelAdmin(admin.ModelAdmin):
    list_display = ("pet", "date", "time", "latitude", "longitude")
