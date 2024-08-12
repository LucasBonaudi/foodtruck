from django.db import models

class FoodTruck(models.Model):
    locationid = models.IntegerField(primary_key=True)
    applicant = models.TextField(null=True, blank=True)
    facility_type = models.TextField(null=True, blank=True)
    location_description = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    permit = models.TextField(null=True, blank=True)
    status = models.TextField(null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    # def __str__(self):
    #     return self.locationid
