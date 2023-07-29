from django.urls import path

from . import views

urlpatterns = [
    path('pets/<int:pk>', views.PetListView.as_view(), name='pet_list'),
]
