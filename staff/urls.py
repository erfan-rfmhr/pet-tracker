from django.urls import path

from . import views

urlpatterns = [
    path('profile/<int:pk>', views.StaffProfileUpdateView.as_view(), name='staff:profile'),
]
