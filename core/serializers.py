from rest_framework import serializers

from .models import CoreUser


class CoreUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreUser
        fields = ['username', 'password', 'first_name', 'last_name']
