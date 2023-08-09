import factory
from factory.django import DjangoModelFactory

from core.factories import CoreUserFactory
from petowner.models import PetOwner


class PetOwnerFactory(DjangoModelFactory):
    class Meta:
        model = PetOwner
        django_get_or_create = ('user',)

    user = factory.SubFactory(CoreUserFactory)
    phone = factory.Faker('phone_number')
    address = factory.Faker('address')
