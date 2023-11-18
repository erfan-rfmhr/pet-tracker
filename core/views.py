from allauth.account.views import LoginView
from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.shortcuts import render
from django.views import generic, View

from pet.models import PetTemperatureModel, PetModel, PetCoordinateModel
from petowner.models import PetOwner
from .forms import CustomLoginForm


# Create your views here.
@login_required
def index(request):
    context = {}
    if request.user.is_authenticated and request.user.is_staff:
        petowners = PetOwner.objects.all()
        context = {
            'users': petowners
        }
    return render(request, 'Pages/index.html', context=context)


class CustomLoginView(LoginView):
    template_name = 'account/login.html'
    form_class = CustomLoginForm

    def form_valid(self, form):
        # Get the selected user type from the form
        user_type = form.cleaned_data.get('user_type')

        # Get the username and password from the form
        username = form.cleaned_data.get('login')
        password = form.cleaned_data.get('password')

        # Authenticate the user based on the selected user type
        if user_type == 'staff':
            staff = get_user_model().objects.filter(username=username, is_staff=True).first()
            if staff is None:
                form.add_error(None, 'Invalid type')
                return self.form_invalid(form)
            user = authenticate(username=username, password=password, is_staff=True)
        elif user_type == 'customer':
            customer = get_user_model().objects.filter(username=username, is_customer=True).first()
            if customer is None:
                form.add_error(None, 'Invalid type')
                return self.form_invalid(form)
            user = authenticate(username=username, password=password, is_customer=True)
        else:
            user = None

        # If the authentication failed, reject the login request
        if user is None:
            form.add_error(None, 'Invalid username or password')
            return self.form_invalid(form)

        # Otherwise, log in the user and redirect to the success URL
        login(self.request, user)
        return super().form_valid(form)


class PetTemperatureDashboardView(LoginRequiredMixin, generic.ListView):
    model = PetTemperatureModel
    template_name = 'Pages/dashboard.html'
    context_object_name = 'temperatures'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['petowners'] = PetOwner.objects.all()
        context['pets'] = PetModel.objects.all()
        return context


class GetPetInfoView(View):
    def get(self, request, *args, **kwargs):
        pet_id = request.GET.get('pet_id', None)
        if pet_id is None:
            data = {'success': False}
        else:
            pet_temperature_info = list(
                PetTemperatureModel.objects.filter(pet_id=pet_id).values('temperature', 'date').order_by('-date',
                                                                                                         '-time'))
            pet_coordinate_info = list(
                PetCoordinateModel.objects.filter(pet_id=pet_id).values('latitude', 'longitude', 'date').order_by(
                    '-date', '-time'))
            pet_info = {'temperature_info': pet_temperature_info, 'coordinate_info': pet_coordinate_info}
            data = {'success': True, 'pet_info': pet_info}
        return JsonResponse(data)


class GetPetsView(View):
    def get(self, request, *args, **kwargs):
        petowner_id = request.GET.get('petowner_id', None)

        pets = PetModel.objects.filter(petowner_id=petowner_id).only('id', 'name').values('id', 'name')
        data = {'pets': list(pets)}

        return JsonResponse(data)
