from django.urls import path

from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('', views.CustomLoginView.as_view(), name='account_login'),
    path('login/', views.CustomLoginView.as_view(), name='account_login'),
    path('dashboard/', views.PetTemperatureDashboardView.as_view(), name='dashboard'),
    path('dashboard/info/', views.GetPetInfoView.as_view(), name='dashboard_info'),
    path('dashboard/pets/', views.GetPetsView.as_view(), name='dashboard_pets'),
    path('dashboard/stream/', views.dashboard_stream, name='dashboard_stream'),
]
