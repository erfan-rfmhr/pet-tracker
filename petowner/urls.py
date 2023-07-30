from django.urls import path

from . import views

urlpatterns = [
    path('petowner/<int:pk>/edit/', views.PetOwnerUpdateView.as_view(), name='petowner:edit'),
    path('api/petowner/new/', views.PetOwnerCreateAPIView.as_view(), name='petowner:new_api'),
    path('petowner/<int:pk>/delete/', views.PetOwnerDeleteView.as_view(), name='petowner:delete'),
    path('petowner/<int:pk>/pets', views.PetOwnerPetListView.as_view(), name='petowner:pet_list'),
    path('petowner/api/pets/create', views.PetOwnerCreatePetView.as_view(), name='petowner:pet_create'),
]
