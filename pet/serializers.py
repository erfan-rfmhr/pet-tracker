from rest_framework import serializers

from .models import PetModel


class PetSerializer(serializers.ModelSerializer):
    petowner_username = serializers.CharField(source='petowner.user.username', read_only=True)

    class Meta:
        model = PetModel
        fields = (
            'name', 'type', 'breed', 'age', 'birthdate', 'image', 'serial_number', 'petowner', 'petowner_username')
