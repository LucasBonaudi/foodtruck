from django.urls import path
from .views import FoodTruckListAPI

urlpatterns = [
    path('api/foodtrucks/', FoodTruckListAPI.as_view(), name='foodtruck-list-api'),
]