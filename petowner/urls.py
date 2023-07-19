from django.urls import path

from . import views

urlpatterns = [
    path('petowner/new/', views.PetOwnerCreateView.as_view(), name='petowner_new'),
]
