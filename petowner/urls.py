from django.urls import path

from . import views

app_name = 'petowner'

urlpatterns = [
    path('petowner/<int:pk>/edit/', views.PetOwnerUpdateView.as_view(), name='edit'),
    path('api/petowner/new/', views.PetOwnerCreateAPIView.as_view(), name='new_api'),
    path('api/petowner/<int:pk>/delete', views.PetOwnerDeleteAPIView.as_view(), name='api_delete'),
    path('petowner/<int:pk>/pets', views.PetOwnerPetListView.as_view(), name='pet_list'),
    path('petowner/api/pets/create', views.PetOwnerCreatePetView.as_view(), name='pet_create'),
]
