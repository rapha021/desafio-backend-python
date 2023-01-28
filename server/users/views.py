from rest_framework import generics
from rest_framework.views import Response, status
from .models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

import ipdb


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ListUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)

        return Response(serializer.data, status.HTTP_200_OK)
