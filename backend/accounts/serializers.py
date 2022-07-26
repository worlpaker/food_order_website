from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.settings import api_settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "auth_token",
            "City",
            "Country",
            "Home_address"
        )
        read_only_fields = ("id", "auth_token")


class CreateUserSerializer(UserSerializer):
    def create(self, validated_data):
        # call create_user on user object. Without this, the password will be stored in plain text.
        user = User.objects.create_user(**validated_data)
        return user

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + (
            "password",
        )
        read_only_fields = ("auth_token",)
        extra_kwargs = {"password": {"write_only": True}}

# create token


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Custom claims
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['City'] = user.City
        token['Country'] = user.Country
        token['Home_address'] = user.Home_address
        return token


# refresh token
class TokenRefreshLifetimeSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        refresh = self.token_class(attrs["refresh"])
        data = {"access": str(refresh.access_token)}
        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass
            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()

            data["refresh"] = str(refresh)

        return data
