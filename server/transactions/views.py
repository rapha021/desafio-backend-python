from rest_framework import generics
from rest_framework.parsers import MultiPartParser
from rest_framework.views import Response, status

from .models import Transaction
from .serializers import TransactionSerializer

from stores.models import Store

from datetime import datetime

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
import ipdb


class CreateTransactionView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    parser_classes = [MultiPartParser]

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        transactions_lines = request.FILES["cnab"].readlines()

        for transaction in transactions_lines:
            transaction_decoded = transaction.decode("utf-8")
            transaction_code = transaction_decoded[0]

            dict = {
                "type": transaction_code,
                "date": datetime.strptime(transaction_decoded[1:9], "%Y%m%d").date(),
                "value": (float(transaction_decoded[9:19]) / 100),
                "cpf": transaction_decoded[19:30],
                "card": transaction_decoded[30:42],
                "hour": datetime.strptime(transaction_decoded[42:48], "%H%M%S").time(),
                "store_owner": transaction_decoded[48:62],
                "store_name": transaction_decoded[62:80],
            }

            store = Store.objects.get_or_create(
                name=dict["store_name"],
                owner_name=dict["store_owner"],
                user=request.user,
            )

            del dict["store_name"]
            del dict["store_owner"]

            transaction_signal = "+"

            if int(transaction_code) in [1, 4, 5, 6, 7, 8]:
                transaction_signal = "+"
            else:
                transaction_signal = "-"

            if transaction_signal == "+":
                store[0].balance += dict["value"]
            else:
                store[0].balance -= dict["value"]

            store[0].save()

            serializer = TransactionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(**dict, store=store[0])

        return Response(serializer.data, status.HTTP_201_CREATED)


class ListTransactionView(generics.ListAPIView, PageNumberPagination):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        stores = Store.objects.filter(user=self.request.user)

        stores_ids = list()

        [stores_ids.append(store.pk) for store in stores]

        all_transactions_dicts = list()

        for id in stores_ids:
            transactions = Transaction.objects.filter(store_id=id)
            all_transactions_dicts.append([t for t in transactions])

        all_transactions = [
            transaction for list in all_transactions_dicts for transaction in list
        ]

        return all_transactions
