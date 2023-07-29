from django.urls import path

from . import views

urlpatterns = [
    path('pets/<int:pk>', views.PetListView.as_view(), name='pet_list'),
    path('api/pets/create', views.PetCreateView.as_view(), name='pet_create'),
    path('pets/<int:pk>/delete', views.PetDeleteView.as_view(), name='pet_delete'),
]
