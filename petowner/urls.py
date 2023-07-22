from django.urls import path

from . import views

urlpatterns = [
    path('petowner/new/', views.PetOwnerCreateView.as_view(), name='petowner_new'),
    path('petowner/<int:pk>/edit/', views.PetOwnerUpdateView.as_view(), name='petowner_edit'),
]
