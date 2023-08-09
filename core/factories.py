import factory
from factory.django import DjangoModelFactory

from core.models import CoreUser


class CoreUserFactory(DjangoModelFactory):
    class Meta:
        model = CoreUser
        django_get_or_create = ('username',)

    username = factory.Sequence(lambda n: f'user{n + 1}')
    first_name = factory.Sequence(lambda n: f'fname{n + 1}')
    last_name = factory.Sequence(lambda n: f'lname{n + 1}')
    email = factory.LazyAttribute(lambda obj: f'{obj.username}@example.com')
    is_customer = True
