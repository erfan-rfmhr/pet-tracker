from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views import generic

from .forms import PetModelForm
from .models import PetModel


class PetDeleteView(LoginRequiredMixin, generic.DeleteView):
    model = PetModel
    template_name = 'Pages/pet_delete.html'

    def get_success_url(self):
        pet = PetModel.objects.get(pk=self.kwargs['pk'])
        petowner_id = pet.petowner.id
        return reverse_lazy('petowner:pet_list', kwargs={'pk': petowner_id})


class PetUpdateView(LoginRequiredMixin, generic.UpdateView):
    model = PetModel
    form_class = PetModelForm
    template_name = 'Pages/pet_update.html'
    success_url = reverse_lazy('index')


class PetListView(LoginRequiredMixin, generic.ListView):
    model = PetModel
    template_name = 'Pages/pet_list.html'
    context_object_name = 'pets'
