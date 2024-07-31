from random import choice

import factory
from factory.django import DjangoModelFactory
from faker import Faker

from petowner.factories import PetOwnerFactory
from .models import PetModel

DOG_BREEDS = (
    'labrador retriever',
    'german shepherd',
    'golden retriever',
    'bulldog',
    'boxer',
)
CAT_BREEDS = (
    'persian',
    'ragdoll',
    'british shorthair',
)
BIRD_BREEDS = (
    'Red canary',
    'Love bird',
    'Cockatiel'
)

fake = Faker()


class PetModelFactory(DjangoModelFactory):
    class Meta:
        model = PetModel
        # Assuming 'serial_number' is a unique field in PetModel
        django_get_or_create = ('serial_number',)

    name = fake.first_name()
    type = factory.Faker('random_element', elements=('dog', 'cat', 'bird',))
    age = factory.Faker('random_int', min=0, max=20)
    birthdate = factory.Faker('date_this_century')
    serial_number = factory.Sequence(lambda n: f'PV1100000{n + 1}')
    petowner = factory.SubFactory(PetOwnerFactory)

    @factory.post_generation
    def breed(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        if extracted:
            # A list of breeds were passed in, use them
            self.breed = extracted
        else:
            # No specific breed were passed, choose randomly
            match self.type:
                case 'dog':
                    self.breed = choice(DOG_BREEDS)
                case 'cat':
                    self.breed = choice(CAT_BREEDS)
                case 'bird':
                    self.breed = choice(BIRD_BREEDS)
        self.save()
