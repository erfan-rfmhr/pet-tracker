# Generated by Django 4.2 on 2023-09-09 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pet', '0004_alter_petmodel_age'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pettemperaturemodel',
            name='temperature',
            field=models.DecimalField(decimal_places=10, max_digits=10),
        ),
    ]