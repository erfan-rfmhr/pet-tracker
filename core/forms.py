from allauth.account.forms import LoginForm
from django import forms


class CustomLoginForm(LoginForm):
    user_type = forms.ChoiceField(choices=(('staff', 'Staff'), ('customer', 'Customer')), widget=forms.RadioSelect)

    def __init__(self, *args, **kwargs):
        super(CustomLoginForm, self).__init__(*args, **kwargs)

