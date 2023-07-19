from django import forms
from django.contrib.auth import get_user_model


class StaffProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name', 'username']
        widgets = {
            'username': forms.TextInput(attrs={'readonly': 'readonly'}),
        }
