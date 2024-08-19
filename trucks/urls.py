from django.urls import path
from .views import FoodTruckListAPI

urlpatterns = [
    path('foodtrucks', FoodTruckListAPI.as_view(), name='foodtruck-list-api'),
]