from rest_framework import viewsets
from .models import Restaurant, RestaurantCategory, Food
from .serializers import Restaurant_serializer, Restaurant_cat_serializer, Food_serializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from rest_framework import generics
from rest_framework import filters

# Restaurant


class Restaurant_view(viewsets.ModelViewSet):
    serializer_class = Restaurant_serializer
    queryset = Restaurant.objects.all()
    permission_classes = (AllowAny,)

# Restaurant Category


class Restaurant_cat_view(viewsets.ModelViewSet):
    serializer_class = Restaurant_cat_serializer
    queryset = RestaurantCategory.objects.all()
    permission_classes = (AllowAny,)

# Food


class Food_view(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = Food_serializer
    queryset = Food.objects.all()
    permission_classes = (AllowAny,)

# Search restaurant foods for frontend


class Foods_and_restaurants_view(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Food.objects.all()
    serializer_class = Food_serializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['food_restaurant__name']
