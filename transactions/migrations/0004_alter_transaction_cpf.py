# Generated by Django 4.1.5 on 2023-01-24 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("transactions", "0003_alter_transaction_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transaction",
            name="cpf",
            field=models.CharField(max_length=11),
        ),
    ]
