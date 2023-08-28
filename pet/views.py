from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.views import generic
from rest_framework.response import Response
from rest_framework.views import APIView

from .forms import PetModelForm
from .models import PetModel


class PetDeleteAPIView(APIView):
    def delete(self, request, pk):
        pet = get_object_or_404(PetModel, pk=pk)
        pet.delete()
        return Response(status=204)


class PetUpdateView(LoginRequiredMixin, generic.UpdateView):
    model = PetModel
    form_class = PetModelForm
    template_name = 'Pages/pet_update.html'
    success_url = reverse_lazy('index')


class PetListView(LoginRequiredMixin, generic.ListView):
    model = PetModel
    template_name = 'Pages/pet_list.html'
    context_object_name = 'pets'


class PetTemperatureCreateAPIView(APIView):
    def post(self, request):
        with open('file.txt', 'a') as f:
            f.write(request.data)
        return Response(data=request.data)


class PetCoordinateCreateAPIView(APIView):
    def post(self, request):
        with open('file.txt', 'a') as f:
            f.write(request.data)
        return Response(data=request.data)
