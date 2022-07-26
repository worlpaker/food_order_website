from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from .data import Sql_Data

# Admin gets users,orders and restaurants from postgresql


class Admin_usersView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        data = Sql_Data.users()
        data = [item for sublist in data for item in sublist]
        response = Response()
        response.data = data
        return response


class Admin_ordersView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        data = Sql_Data.orders()
        data = [item for sublist in data for item in sublist]
        response = Response()
        response.data = data
        return response


class Admin_restaurantsView(APIView):
    permission_classes = [IsAdminUser]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        data = Sql_Data.restaurants()
        data = [item for sublist in data for item in sublist]
        response = Response()
        response.data = data
        return response
