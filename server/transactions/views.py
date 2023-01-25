from rest_framework import generics
from rest_framework.parsers import FileUploadParser, MultiPartParser
from django.shortcuts import get_object_or_404
from rest_framework.views import Response, status

from .models import Transaction
from .serializers import TransactionSerializer

from stores.models import Store

from datetime import datetime, date, time

# Create your views here.


class CreateTransactionView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    parser_classes = [MultiPartParser]

    def create(self, request, *args, **kwargs):
        transactions_lines = self.request.FILES["cnab"].readlines()

        for transaction in transactions_lines:
            transaction_decoded = transaction.decode("utf-8")
            dict = {
                "type": transaction_decoded[0],
                "date": datetime.strptime(transaction_decoded[1:9], "%Y%m%d").date(),
                "value": (float(transaction_decoded[9:19]) / 100),
                "cpf": transaction_decoded[19:30],
                "card": transaction_decoded[30:42],
                "hour": datetime.strptime(transaction_decoded[42:48], "%H%M%S").time(),
                "store_owner": transaction_decoded[48:62],
                "store_name": transaction_decoded[62:80],
            }

            store = Store.objects.get_or_create(
                name=dict["store_name"], owner_name=dict["store_owner"]
            )

            del dict["store_name"]
            del dict["store_owner"]

            transaction_type = ""

            if int(dict["type"]) in [1, 4, 5, 6, 7, 8]:
                transaction_type = "+"
            else:
                transaction_type = "-"

            if transaction_type == "+":
                store[0].balance += float(dict["value"])
            else:
                store[0].balance -= float(dict["value"])

            store[0].save()

            serializer = TransactionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(**dict, store=store[0])

        return Response(serializer.data, status.HTTP_201_CREATED)
