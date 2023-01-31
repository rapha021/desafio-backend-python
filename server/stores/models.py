from django.db import models


class Store(models.Model):
    name = models.CharField(max_length=19)

    balance = models.FloatField(default=0, blank=True)

    owner_name = models.CharField(max_length=14)

    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="stores"
    )
