from django.contrib.auth import get_user_model
from django.urls import reverse_lazy
from django.views import generic

from staff.forms import StaffProfileUpdateForm
from .forms import PetOwnerCreationForm
from .models import PetOwner


class PetOwnerCreateView(generic.CreateView):
    model = PetOwner
    form_class = PetOwnerCreationForm
    template_name = 'Pages/petowner_new.html'
    success_url = reverse_lazy('index')


class PetOwnerUpdateView(generic.UpdateView):
    model = get_user_model()
    form_class = StaffProfileUpdateForm
    template_name = 'account/profile.html'
    context_object_name = 'petowner'
    success_url = reverse_lazy('index')
