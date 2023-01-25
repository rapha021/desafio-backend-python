from django.db import models


class Types(models.TextChoices):
    DEBITO = "1"
    BOLETO = "2"
    FINANCIAMENTO = "3"
    CREDITO = "4"
    EMPRESTIMO = "5"
    VENDAS = "6"
    TED = "7"
    DOC = "8"
    ALUGUEL = "9"


class Transaction(models.Model):
    type = models.CharField(
        max_length=30,
        choices=Types.choices,
        default=Types.DEBITO,
    )

    date = models.DateField()

    value = models.FloatField(max_length=10)

    cpf = models.CharField(max_length=11)

    card = models.CharField(max_length=12)

    hour = models.TimeField()

    store = models.ForeignKey(
        "stores.Store", on_delete=models.CASCADE, related_name="transactions"
    )
