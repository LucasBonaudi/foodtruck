import requests
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import TestCase
from unittest.mock import patch, MagicMock
from .models import FoodTruck
from .views import FoodTruckListAPI
from .serializers import FoodTruckSerializer
from django.urls import reverse, resolve
from rest_framework.test import APIClient
from rest_framework import status

class ImportFoodTrucksTest(TestCase):

    @patch('requests.get')
    def test_successful_import(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = [
            {
                'objectid': 1,
                'applicant': 'Test Truck',
                'facilitytype': 'Truck',
                'locationdescription': 'Test Location',
                'address': '123 Test St',
                'permit': 'ABC123',
                'status': 'APPROVED',
                'latitude': '37.7749',
                'longitude': '-122.4194',
                'fooditems': 'Test Food'
            }
        ]
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        call_command('import_food_trucks', 'http://example.com/api/foodtrucks')

        self.assertTrue(FoodTruck.objects.filter(applicant='Test Truck').exists())

    @patch('requests.get')
    def test_http_error(self, mock_get):
        mock_get.side_effect = requests.exceptions.HTTPError('HTTP error')

        with self.assertRaises(CommandError):
            call_command('import_food_trucks', 'http://example.com/api/foodtrucks')

    @patch('requests.get')
    def test_connection_error(self, mock_get):
        mock_get.side_effect = requests.exceptions.ConnectionError('Connection error')

        with self.assertRaises(CommandError):
            call_command('import_food_trucks', 'http://example.com/api/foodtrucks')

    @patch('requests.get')
    def test_timeout_error(self, mock_get):
        mock_get.side_effect = requests.exceptions.Timeout('Timeout error')

        with self.assertRaises(CommandError):
            call_command('import_food_trucks', 'http://example.com/api/foodtrucks')

    @patch('requests.get')
    def test_invalid_json(self, mock_get):
        mock_response = MagicMock()
        mock_response.json.side_effect = ValueError('Invalid JSON')
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        with self.assertRaises(CommandError):
            call_command('import_food_trucks', 'http://example.com/api/foodtrucks')

    @patch('requests.get')
    @patch('trucks.models.FoodTruck.objects.create')
    def test_database_error(self, mock_create, mock_get):
        mock_response = MagicMock()
        mock_response.json.return_value = [
            {
                'objectid': 1,
                'applicant': 'Test Truck',
                'facilitytype': 'Truck',
                'locationdescription': 'Test Location',
                'address': '123 Test St',
                'permit': 'ABC123',
                'status': 'APPROVED',
                'latitude': '37.7749',
                'longitude': '-122.4194',
                'fooditems': 'Test Food'
            }
        ]
        mock_response.raise_for_status = MagicMock()
        mock_get.return_value = mock_response

        mock_create.side_effect = Exception('Database error')

        with self.assertRaises(CommandError):
            call_command('import_food_trucks', 'http://example.com/api/foodtrucks')


class FoodTruckListAPITestCase(TestCase):

    def setUp(self):
        # Test data
        self.food_truck1 = FoodTruck.objects.create(
            locationid=1, applicant="Test Truck 1", facility_type="Truck",
            location_description="Test Location 1", address="123 Test St",
            permit="ABC123", status="APPROVED", latitude=37.7749,
            longitude=-122.4194, foodItems="Burgers, Fries"
        )
        self.food_truck2 = FoodTruck.objects.create(
            locationid=2, applicant="Test Truck 2", facility_type="Truck",
            location_description="Test Location 2", address="456 Test St",
            permit="DEF456", status="APPROVED", latitude=37.7849,
            longitude=-122.4094, foodItems="Tacos, Burritos"
        )

        self.client = APIClient()

    def test_foodtruck_list_url_resolves(self):
        """Test that the foodtruck-list-api URL resolves to the correct view."""
        url = reverse('foodtruck-list-api')
        self.assertEqual(resolve(url).func.view_class, FoodTruckListAPI)

    def test_get_food_truck_list(self):
        """Test retrieving a list of food trucks."""
        url = reverse('foodtruck-list-api')
        response = self.client.get(url)
        
        food_trucks = FoodTruck.objects.all()
        serializer = FoodTruckSerializer(food_trucks, many=True)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_fooditem_filter(self):
        """Test filtering food trucks by food items."""
        url = reverse('foodtruck-list-api')
        response = self.client.get(url, {'fooditem': 'chicken'})
        
        food_trucks = FoodTruck.objects.filter(foodItems__icontains='chicken')
        serializer = FoodTruckSerializer(food_trucks, many=True)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_geographical_filter(self):
        """Test filtering food trucks by geographical bounding box."""
        url = reverse('foodtruck-list-api')
        response = self.client.get(url, {
            'ne_lat': 37.7849,
            'ne_lng': -122.4094,
            'sw_lat': 37.7749,
            'sw_lng': -122.4194
        })
        
        food_trucks = FoodTruck.objects.filter(
            latitude__lte=37.7849,
            latitude__gte=37.7749,
            longitude__lte=-122.4094,
            longitude__gte=-122.4194,
        )
        serializer = FoodTruckSerializer(food_trucks, many=True)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_no_filters(self):
        """Test that no filters return all food trucks."""
        url = reverse('foodtruck-list-api')
        response = self.client.get(url)
        
        food_trucks = FoodTruck.objects.all()
        serializer = FoodTruckSerializer(food_trucks, many=True)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)