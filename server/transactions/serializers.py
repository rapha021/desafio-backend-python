from rest_framework import serializers
from .models import Transaction
import ipdb


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"
        read_only_fields = ["date", "value", "cpf", "card", "hour", "store"]
        depth = 1

    type = serializers.SerializerMethodField()

    def get_type(self, obj):
        match obj.type:
            case "1":
                return "Débito"
            case "2":
                return "Boleto"
            case "3":
                return "Financiamento"
            case "4":
                return "Crédito"
            case "5":
                return "Emprestimo"
            case "6":
                return "Vendas"
            case "7":
                return "TED"
            case "8":
                return "DOC"
            case "9":
                return "Aluguel"
