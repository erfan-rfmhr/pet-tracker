from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic

from petowner.models import PetOwner


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
