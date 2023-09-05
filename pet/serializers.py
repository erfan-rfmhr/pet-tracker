from rest_framework import serializers

from .models import PetModel, PetTemperatureModel, PetCoordinateModel


class PetSerializer(serializers.ModelSerializer):
    petowner_username = serializers.CharField(source='petowner.user.username', read_only=True)

    class Meta:
        model = PetModel
        fields = (
            'name', 'type', 'breed', 'age', 'birthdate', 'image', 'serial_number', 'petowner', 'petowner_username')


class PetTemperatureSerializer(serializers.ModelSerializer):
    pet = serializers.SlugRelatedField(slug_field='serial_number', queryset=PetModel.objects.all())

    class Meta:
        model = PetTemperatureModel
        fields = ('temperature', 'pet')


class PetCoordinateSerializer(serializers.ModelSerializer):
    pet = serializers.SlugRelatedField(slug_field='serial_number', queryset=PetModel.objects.all())

    class Meta:
        model = PetCoordinateModel
        fields = ('point', 'pet')
