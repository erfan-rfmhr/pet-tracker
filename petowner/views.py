from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.urls import reverse_lazy, reverse
from django.views import generic
from rest_framework import generics

from core.forms import UserProfileUpdateForm
from .models import PetOwner
from .serializers import PetOwnerCreationSerializer


class PetOwnerUpdateView(generic.UpdateView):
    model = get_user_model()
    form_class = UserProfileUpdateForm
    template_name = 'account/profile.html'
    context_object_name = 'petowner'
    success_url = reverse_lazy('index')


class PetOwnerCreateAPIView(generics.CreateAPIView):
    queryset = PetOwner.objects.all()
    serializer_class = PetOwnerCreationSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            return redirect(reverse('index'))
        else:
            return response

    def perform_create(self, serializer):
        data = serializer.validated_data
        user = get_user_model().objects.create_user(username=data['username'], password=data['password'],
                                                    first_name=data['first_name'], last_name=data['last_name'], )
        PetOwner.objects.create(user=user, phone=data['phone'], address=data['address'], )
