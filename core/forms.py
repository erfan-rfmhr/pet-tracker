from allauth.account.forms import LoginForm
from django import forms
from django.contrib.auth import get_user_model


class CustomLoginForm(LoginForm):
    user_type = forms.ChoiceField(choices=(('staff', 'Staff'), ('customer', 'Customer')), widget=forms.RadioSelect)

    def __init__(self, *args, **kwargs):
        super(CustomLoginForm, self).__init__(*args, **kwargs)


class UserProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name', 'username']
        widgets = {
            'username': forms.TextInput(attrs={'readonly': 'readonly'}),
        }
