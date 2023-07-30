from django.urls import path

from . import views

app_name = 'pet'

urlpatterns = [
    path('api/pets/<int:pk>/delete', views.PetDeleteAPIView.as_view(), name='api_delete'),
    path('pets/<int:pk>/update', views.PetUpdateView.as_view(), name='update'),
    path('pets/list', views.PetListView.as_view(), name='list'),
]
