from django.db import models


class Store(models.Model):
    name = models.CharField(max_length=19, unique=True)

    balance = models.DecimalField(
        default=0, blank=True, max_digits=10, decimal_places=2
    )

    owner_name = models.CharField(max_length=14)
