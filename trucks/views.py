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
        queryset = super().get_queryset()
        food_items_filter = self.request.query_params.get('fooditem', None)
        ne_lat = self.request.query_params.get('ne_lat', None)
        ne_lng = self.request.query_params.get('ne_lng', None)
        sw_lat = self.request.query_params.get('sw_lat', None)
        sw_lng = self.request.query_params.get('sw_lng', None)

        if food_items_filter:
            queryset = queryset.filter(foodItems__icontains=food_items_filter)
        
        if ne_lat and ne_lng and sw_lat and sw_lng:
            queryset = queryset.filter(
                latitude__lte=ne_lat,
                latitude__gte=sw_lat,
                longitude__lte=ne_lng,
                longitude__gte=sw_lng,
            )

        return queryset