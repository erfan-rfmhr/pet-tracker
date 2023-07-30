from django.urls import path

from . import views

app_name = 'pet'

urlpatterns = [
    path('pets/<int:pk>/delete', views.PetDeleteView.as_view(), name='delete'),
    path('pets/<int:pk>/update', views.PetUpdateView.as_view(), name='update'),
]
