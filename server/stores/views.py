from django.shortcuts import render
from rest_framework import generics

from .models import Store
from .serializer import StoreSerializer

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class ListStoreView(generics.ListAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        stores = Store.objects.filter(user=self.request.user)

        return stores
