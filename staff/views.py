from django.contrib.auth import get_user_model
from django.views import generic
from django.urls import reverse_lazy

from .forms import StaffProfileUpdateForm


class StaffProfileUpdateView(generic.UpdateView):
    template_name = 'account/profile.html'
    queryset = get_user_model().objects.all()
    form_class = StaffProfileUpdateForm

    def get_success_url(self):
        return reverse_lazy('staff_profile', kwargs={'pk': self.kwargs['pk']})

    def get_queryset(self):
        # Get staff users
        return super().get_queryset().filter(is_staff=True)
