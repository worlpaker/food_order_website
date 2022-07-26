from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import authenticate, login, logout
from .models import User
from .serializers import CreateUserSerializer, MyTokenObtainPairSerializer, TokenRefreshLifetimeSerializer


# Create a new user in the system
class UserCreateViewSet(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

# Logout


class LogoutView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response()
        response.delete_cookie(key='refresh')
        print(request)
        logout(request)
        response.data = {
            "message": "Logged out successfully"
        }
        return response

# Renew refresh token with new expire time based on specific user's access token.


class CheckrefreshView(TokenRefreshView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = TokenRefreshLifetimeSerializer

    def post(self, request):
        refresh = request.COOKIES.get("refresh")
        if refresh is None:
            response = Response()
            response.data = {"No token"}
            return response
        else:
            serializer = TokenRefreshLifetimeSerializer().validate(attrs={
                "refresh": refresh})
            response = Response()
            response.set_cookie(
                key="refresh", value=serializer['refresh'], httponly=True)
            response.data = {
                "access": serializer['access'],
            }
            return response


# Login
class MyTokenObtainPairView(TokenObtainPairView):
    # frontend
    serializer_class = MyTokenObtainPairSerializer
    permission_classes = (AllowAny,)
    # backend check again and login in db.

    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = authenticate(request, email=email, password=password)
        if user is None:
            return Response({"error": "Invalid Email or Password"}, status=400)
        else:
            login(request, user)
            serializer = MyTokenObtainPairSerializer().validate(request.data)
            response = Response()
            # set cookie frontend
            response.set_cookie(
                key="refresh", value=serializer['refresh'], httponly=True)
            # if working on domain then:
            #response.set_cookie(key="Refresh", value=serializer['refresh'], secure=True , httponly=True, samesite='Strict')
            response.data = {
                "access": serializer['access'],
            }
            return response

# Reset password


class ResetpasswordView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        email = request.data['email']
        old_password = request.data['old_password']
        new_password = request.data['new_password']
        user = authenticate(request, email=email, password=old_password)
        if user is None:
            return Response({"error": "Invalid Email or Password"}, status=400)
        else:
            user.set_password(new_password)
            user.save()
            return Response("Password successfully changed.", status=200)
