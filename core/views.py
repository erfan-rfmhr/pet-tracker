from django.shortcuts import render

from petowner.models import PetOwner


# Create your views here.
def index(request):
    context = {}
    if request.user.is_authenticated and request.user.is_staff:
        petowners = PetOwner.objects.all()
        context = {
            'users': petowners
        }
    return render(request, 'Pages/index.html', context=context)
