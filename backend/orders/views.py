from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
import uuid


from .models import Orders
from .serializers import OrderSerializer

# Kafka handle order
from msg_service.producer import Producer_service
from msg_service.consumer import Order_consumer

# Create order view


class OrderCreateViewSet(APIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Order_list = {
            "order_id": uuid.uuid4().hex,
            "user": request.user.email,
            "food_restaurant": request.data['food_restaurant_order'],
            "food_name": request.data['food_name_order'],
            "quantity": request.data['quantity'],
            "status": Orders.OrderStatus.CREATED,
            "count": len(request.data['food_name_order'])
        }
        Producer_service.order_service(
            "Order", Order_list)  # produce order kafka
        Order_consumer.create_order()  # consume order kafka

        #order = Orders.objects.create(user=user, food_restaurant_order_id=food_restaurant, food_name_order_id=food_name, quantity=quantity, status=status)
        # print(z)

        response = Response()
        response.data = {
            "Order successfully created."
        }
        return response


# All order list for admin
class OrderListViewSet(generics.ListAPIView):
    queryset = Orders.objects.order_by("-modified_date")
    serializer_class = OrderSerializer
    permission_classes = (IsAdminUser,)
    filterset_fields = ["status"]

# Order history for user


class OrderhistoryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    serializer_class = OrderSerializer

    def get_queryset(self):
        """
        This view should return a list of all the orders
        for the currently authenticated user.
        """
        user = self.request.user
        return Orders.objects.filter(user=user).order_by("-modified_date")
