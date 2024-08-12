from django.shortcuts import render
from rest_framework import generics
from .models import FoodTruck
from .serializers import FoodTruckSerializer

class FoodTruckListAPI(generics.ListAPIView):
    queryset = FoodTruck.objects.all()
    serializer_class = FoodTruckSerializer
    
