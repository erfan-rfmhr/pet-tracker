from django.urls import path

from . import views

urlpatterns = [
    path('index/', views.PetOwnersList.as_view(), name='petowners_list'),
    path('petowner/new/', views.PetOwnerCreateView.as_view(), name='petowner_new'),
]
