from django import forms
from django.contrib.auth import get_user_model

from petowner.models import PetOwner


class PetOwnerForm(forms.ModelForm):
    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)
    username = forms.CharField(max_length=30)

    class Meta:
        model = PetOwner
        fields = ['first_name', 'last_name', 'username', 'phone', 'address', 'image']

    def __init__(self, *args, **kwargs):
        super(PetOwnerForm, self).__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields['first_name'].initial = self.instance.user.first_name
            self.fields['last_name'].initial = self.instance.user.last_name
            self.fields['username'].initial = self.instance.user.username

    def save(self, commit=True):
        instance = super(PetOwnerForm, self).save(commit=False)
        user = get_user_model().objects.get(pk=self.instance.user.pk)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.username = self.cleaned_data['username']
        if commit:
            user.save()
            instance.save()
        return instance
