import factory
from factory.django import DjangoModelFactory
from faker import Faker

from core.factories import CoreUserFactory
from petowner.models import PetOwner

faker = Faker()


class PetOwnerFactory(DjangoModelFactory):
    class Meta:
        model = PetOwner
        django_get_or_create = ('user',)

    user = factory.SubFactory(CoreUserFactory)
    phone = faker.msisdn()
    address = factory.Faker('address')
