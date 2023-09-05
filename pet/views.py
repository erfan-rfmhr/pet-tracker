from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.views import generic
from rest_framework import renderers, status
from rest_framework.parsers import BaseParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .forms import PetModelForm
from .models import PetModel
from .serializers import PetCoordinateSerializer, PetTemperatureSerializer


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
        serializer = PetTemperatureSerializer(data=request.data)
        with open('file.txt', 'w') as f:
            if not serializer.is_valid():
                f.write('serializer is not valid')
            else:
                f.write(serializer.data.get('body'))
        return Response(data=request.data, status=status.HTTP_201_CREATED)


class PetCoordinateCreateAPIView(APIView):

    def post(self, request):
        serializer = PetCoordinateSerializer(data=request.data)
        with open('file.txt', 'w') as f:
            if not serializer.is_valid():
                f.write('serializer is not valid')
            else:
                f.write(serializer.data.get('body'))
        return Response(data=request.data, status=status.HTTP_201_CREATED)
