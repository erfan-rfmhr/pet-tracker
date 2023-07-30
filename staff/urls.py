from django.urls import path

from . import views

app_name = 'staff'

urlpatterns = [
    path('profile/<int:pk>', views.StaffProfileUpdateView.as_view(), name='profile'),
]
