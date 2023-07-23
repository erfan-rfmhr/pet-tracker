from django.urls import path

from . import views

urlpatterns = [
    path('petowner/<int:pk>/edit/', views.PetOwnerUpdateView.as_view(), name='petowner_edit'),
    path('api/petowner/new/', views.PetOwnerCreateAPIView.as_view(), name='petowner_new_api'),
]
