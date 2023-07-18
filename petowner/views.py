from django.urls import reverse_lazy
from django.views import generic

from .forms import PetOwnerForm
from .models import PetOwner


class PetOwnersList(generic.ListView):
    model = PetOwner
    template_name = 'Pages/index.html'
    context_object_name = 'users'


class PetOwnerCreateView(generic.CreateView):
    model = PetOwner
    form_class = PetOwnerForm
    template_name = 'Pages/petowner_new.html'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)
