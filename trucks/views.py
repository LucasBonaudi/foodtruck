from requests import Response
from rest_framework import generics
from .models import FoodTruck
from .serializers import FoodTruckSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class FoodTruckListAPI(generics.ListAPIView):
    queryset = FoodTruck.objects.all()
    serializer_class = FoodTruckSerializer
    
    def get_queryset(self):
        queryset = FoodTruck.objects.all()
        fooditem = self.request.GET.get('fooditem', None)

        print(fooditem)
        
        if fooditem:
            queryset = queryset.filter(foodItems__icontains=fooditem)
        
        return queryset