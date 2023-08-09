from django.core.management import BaseCommand

from core.factories import CoreUserFactory
from pet.factories import PetModelFactory
from petowner.factories import PetOwnerFactory


class Command(BaseCommand):
    help = 'Populate database with dummy data'

    def add_arguments(self, parser):
        parser.add_argument('user_counts', type=int, default=10, help='Number of users to create')
        parser.add_argument('pet_counts_per_user', type=int, default=2, help='Number of users to create')

    def handle(self, *args, **options):
        for _ in range(options['user_counts']):
            user = CoreUserFactory()
            # Create a pet owner for each user
            PetOwnerFactory(user=user)
            # Create 5 pets for each pet owner
            for _ in range(options['pet_counts_per_user']):
                PetModelFactory(petowner=user.petowner)
        self.stdout.write(self.style.SUCCESS('Successfully populated database with dummy data'))
