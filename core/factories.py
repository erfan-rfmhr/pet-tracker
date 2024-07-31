import factory
from factory.django import DjangoModelFactory
from faker import Faker

from core.models import CoreUser

fake = Faker()
class CoreUserFactory(DjangoModelFactory):
    class Meta:
        model = CoreUser
        django_get_or_create = ('username',)

    username = fake.user_name()
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = factory.LazyAttribute(lambda obj: f'{obj.username}@mail.com')
    is_customer = True
