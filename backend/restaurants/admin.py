from django.contrib import admin
from .models import RestaurantCategory, Restaurant, Food


admin.site.register(RestaurantCategory)
admin.site.register(Restaurant)
admin.site.register(Food)
