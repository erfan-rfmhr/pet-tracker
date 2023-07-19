from django.urls import reverse_lazy
from django.views import generic

from .forms import PetOwnerCreationForm
from .models import PetOwner


class PetOwnerCreateView(generic.CreateView):
    model = PetOwner
    form_class = PetOwnerCreationForm
    template_name = 'Pages/petowner_new.html'
    success_url = reverse_lazy('index')
