from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.views import generic
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .forms import PetModelForm
from .models import PetModel
from .serializers import PetCoordinateSerializer, PetTemperatureSerializer
from .services.checksum import TemperatureCheckSumService


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
        data = self.request.data.copy()
        serial_number = data.pop('serial_number')[0]
        data['pet'] = serial_number

        f = open('temperature.txt', 'a')
        f.write(str(data) + '\n')
        serializer = PetTemperatureSerializer(data=data)
        if not serializer.is_valid():
            f.write('error' + '\n')
            f.close()
            return Response(data='Error41', status=status.HTTP_400_BAD_REQUEST, content_type='text/xml')
        # return Response(data=request.data, status=status.HTTP_200_OK)

        password = self.request.data.get('pass')
        f.write(str(type(password)) + '\n')
        temperature = self.request.data.get('temperature')
        serial_number = self.request.data.get('serial_number')

        if TemperatureCheckSumService(password, temperature, serial_number).check():
            f.write('success' + '\n')
            serializer.save()
            f.close()
            return Response(data='ReceiveSuccess', status=status.HTTP_201_CREATED, content_type='text/xml')
        else:
            f.write('invalid password' + '\n')
            f.close()
            return Response(data='Error40!', status=status.HTTP_400_BAD_REQUEST, content_type='text/xml')


class PetCoordinateCreateAPIView(APIView):
    def post(self, request):
        data = self.request.data.copy()
        serial_number = data.pop('serial_number')[0]
        data['pet'] = serial_number

        serializer = PetCoordinateSerializer(data=data)
        if not serializer.is_valid():
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
