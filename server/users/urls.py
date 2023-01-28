from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("user/", views.CreateUserView.as_view()),
    path("user/info/", views.ListUserView.as_view()),
    path("user/login/", TokenObtainPairView.as_view()),
    path("user/refresh/", TokenRefreshView.as_view()),
]
