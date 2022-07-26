from rest_framework import serializers
from .models import Orders


class OrderSerializer(serializers.ModelSerializer):
    food_restaurant_str = serializers.CharField(
        source='food_restaurant_order', read_only=True)
    food_name_str = serializers.CharField(
        source='food_name_order', read_only=True)
    food_price = serializers.DecimalField(
        source='food_name_order.price',  max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Orders
        fields = ("id", "order_id", "created_date", "modified_date", "food_price", "food_restaurant_str",
                  "food_name_str", "food_restaurant_order", "food_name_order", "quantity", "user", "status")
        read_only_fields = ("order_id",)
