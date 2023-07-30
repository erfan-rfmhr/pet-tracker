from django.urls import path

from . import views

urlpatterns = [
    path('pets/<int:pk>/delete', views.PetDeleteView.as_view(), name='pet:delete'),
    path('pets/<int:pk>/update', views.PetUpdateView.as_view(), name='pet:update'),
]
