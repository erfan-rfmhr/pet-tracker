from django import forms

from .models import PetModel


class PetModelForm(forms.ModelForm):
    class Meta:
        model = PetModel
        fields = ('name', 'type', 'breed', 'age', 'birthdate', 'image', 'serial_number')
        widgets = {
            'birthdate': forms.DateInput(attrs={'type': 'date'}),
            'serial_number': forms.TextInput(attrs={'readonly': 'readonly'}),
            'image': forms.FileInput(attrs={'type': 'file', 'name': 'image', 'id': 'id_image'}),
        }
