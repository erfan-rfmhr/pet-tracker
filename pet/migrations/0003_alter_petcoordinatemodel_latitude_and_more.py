# Generated by Django 4.2 on 2024-03-25 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pet', '0002_alter_pettemperaturemodel_temperature'),
    ]

    operations = [
        migrations.AlterField(
            model_name='petcoordinatemodel',
            name='latitude',
            field=models.DecimalField(decimal_places=10, max_digits=25),
        ),
        migrations.AlterField(
            model_name='petcoordinatemodel',
            name='longitude',
            field=models.DecimalField(decimal_places=10, max_digits=25),
        ),
        migrations.AlterField(
            model_name='pettemperaturemodel',
            name='temperature',
            field=models.DecimalField(decimal_places=10, max_digits=25),
        ),
    ]
