from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse_lazy, reverse
from django.views import generic
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from petowner.models import PetOwner
from .models import PetModel
from .serializers import PetSerializer


class PetListView(LoginRequiredMixin, generic.ListView):
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


class PetCreateView(APIView):
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


class PetDeleteView(LoginRequiredMixin, generic.DeleteView):
    model = PetModel
    template_name = 'Pages/pet_delete.html'

    def get_success_url(self):
        pet = PetModel.objects.get(pk=self.kwargs['pk'])
        petowner_id = pet.petowner.id
        return reverse_lazy('pet_list', kwargs={'pk': petowner_id})
