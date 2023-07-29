from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse_lazy, reverse
from django.views import generic
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.forms import UserProfileUpdateForm
from pet.serializers import PetSerializer
from .models import PetOwner
from .serializers import PetOwnerCreationSerializer


class PetOwnerUpdateView(LoginRequiredMixin, generic.UpdateView):
    model = get_user_model()
    form_class = UserProfileUpdateForm
    template_name = 'account/profile.html'
    context_object_name = 'petowner'
    success_url = reverse_lazy('index')


class PetOwnerCreateAPIView(generics.CreateAPIView):
    queryset = PetOwner.objects.all()
    serializer_class = PetOwnerCreationSerializer
    permission_classes = (IsAuthenticated,)

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


class PetOwnerDeleteView(LoginRequiredMixin, generic.DeleteView):
    model = get_user_model()
    template_name = 'Pages/petowner_delete.html'
    success_url = reverse_lazy('index')


class PetOwnerPetListView(LoginRequiredMixin, generic.ListView):
    template_name = 'Pages/pet_list.html'

    def get_queryset(self):
        petowner = PetOwner.objects.get(pk=self.kwargs['pk'])
        PetOwner.objects.prefetch_related('pets')
        return petowner.pets.all()

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        petowner = PetOwner.objects.get(pk=self.kwargs['pk'])
        context['petowner_username'] = petowner.user.username
        context['pets'] = petowner.pets.all()
        return context


class PetOwnerCreatePetView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        petowner_username = request.data.get('petowner_username')
        petowner = PetOwner.objects.get(user__username=petowner_username)
        data = request.data.copy()
        data['petowner'] = petowner.id
        data['image'] = request.FILES.get('image') if 'image' in request.FILES else ''
        serializer = PetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return redirect(reverse('pet_list', kwargs={'pk': petowner.id}))
        return Response(serializer.errors, status=400)
