from rest_framework import serializers
from .models import Restaurant, RestaurantCategory, Food


class Restaurant_serializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source='category.name', read_only=True)

    class Meta:
        model = Restaurant
        fields = "__all__"

    def create(self, validated_data):
        return Restaurant.objects.create(**validated_data)


class Restaurant_cat_serializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantCategory
        fields = ("id", "created_date", "modified_date", "name")


class Food_serializer(serializers.ModelSerializer):
    food_restaurant = serializers.CharField(source='food_restaurant.name')

    class Meta:
        model = Food
        fields = "__all__"
        read_only_fields = ("quantity",)
