# Generated by Django 4.1.5 on 2023-01-24 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("stores", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="store",
            name="balance",
            field=models.FloatField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name="store",
            name="name",
            field=models.CharField(max_length=19, unique=True),
        ),
    ]
