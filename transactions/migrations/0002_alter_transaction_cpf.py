# Generated by Django 4.1.5 on 2023-01-24 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("transactions", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transaction",
            name="cpf",
            field=models.IntegerField(),
        ),
    ]
