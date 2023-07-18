from django import forms
from django.contrib.auth import get_user_model

from petowner.models import PetOwner


class PetOwnerCreationForm(forms.ModelForm):
    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)
    username = forms.CharField(max_length=30)
    password = forms.CharField(max_length=30, widget=forms.PasswordInput)

    class Meta:
        model = PetOwner
        fields = ['first_name', 'last_name', 'phone', 'address', 'username', 'password', 'image']

    def save(self, commit=True):
        instance = super(PetOwnerCreationForm, self).save(commit=False)
        user = get_user_model().objects.create_user(
            username=self.cleaned_data['username'],
            first_name=self.cleaned_data['first_name'],
            last_name=self.cleaned_data['last_name'],
            password=self.cleaned_data['password'],
        )
        instance.user = user
        if commit:
            instance.save()
        return instance
