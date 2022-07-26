from .models import Orders


class OrderService:
    def create_order(user, food_restaurant, food_name, quantity, status):
        order = Orders.objects.create(user=user, food_restaurant_id=food_restaurant,
                                      food_name_id=food_name, quantity=quantity, status=status)
        OrderService.publish_order(order)
        return order

    def publish_order(order: Orders):
        order.status = Orders.OrderStatus.WAITING
        order.save()
