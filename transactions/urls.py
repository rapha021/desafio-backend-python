from django.urls import path
from . import views

urlpatterns = [
    path("transaction/", views.CreateTransactionView.as_view()),
]
