from rest_framework import serializers


class PetOwnerCreationSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    phone = serializers.CharField(max_length=100)
    address = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100)
