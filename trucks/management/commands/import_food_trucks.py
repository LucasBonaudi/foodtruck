import requests
from requests.exceptions import HTTPError, ConnectionError, Timeout, RequestException
from django.core.management.base import BaseCommand, CommandError
from trucks.models import FoodTruck

class Command(BaseCommand):
    help = 'Imports food trucks data from a JSON endpoint into SQLite'

    def add_arguments(self, parser):
        parser.add_argument('url', type=str, help='The URL of the JSON endpoint')


    def handle(self, *args, **kwargs):
        url = kwargs['url']

        data = self.get_data(url)

        try:
            for item in data:
                FoodTruck.objects.create(
                    locationid=item.get('objectid'),
                    applicant=item.get('applicant'),
                    facility_type=item.get('facilitytype'),
                    location_description=item.get('locationdescription'),
                    address=item.get('address'),
                    permit=item.get('permit'),
                    status=item.get('status'),
                    latitude=item.get('latitude'),
                    longitude=item.get('longitude')
                )
            self.stdout.write(self.style.SUCCESS('Successfully imported food trucks data'))
        except Exception as db_err:
            raise CommandError(f'An error occurred while saving data to the database: {db_err}')
        
        
    def get_data(self, url):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except HTTPError as http_err:
            raise CommandError(f'HTTP error occurred: {http_err}')
        except ConnectionError as conn_err:
            raise CommandError(f'Connection error occurred: {conn_err}')
        except Timeout as timeout_err:
            raise CommandError(f'The request timed out: {timeout_err}')
        except ValueError as json_err:
            raise CommandError(f'Error parsing JSON: {json_err}')
        except RequestException as req_err:
            raise CommandError(f'An error occurred while handling the request: {req_err}')
        except Exception as err:
            raise CommandError(f'An unexpected error occurred: {err}')