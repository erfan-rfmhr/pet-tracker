from django.views import generic

from .models import PetOwner


class PetOwnersList(generic.ListView):
    model = PetOwner
    template_name = 'Pages/index.html'
    context_object_name = 'users'
