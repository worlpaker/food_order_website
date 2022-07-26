"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from restaurants import views as restaurants_views
from accounts import views as accounts_views
from orders import views as orders_views
from admin_panel import views as admin_views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
# router_error = routers.SimpleRouter() for hide.

# Restaurant as viewsets
router.register(
    r'restaurants', restaurants_views.Restaurant_view, 'Restaurant')
router.register(r'restaurants_cat',
                restaurants_views.Restaurant_cat_view, 'Restaurant Category')
router.register(r'restaurants_food',
                restaurants_views.Food_view, "Restaurants's Food")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/rest_and_food/', restaurants_views.Foods_and_restaurants_view.as_view(),
         name='rest_and_food'),  # get exactly food

    path('api/register/', accounts_views.UserCreateViewSet.as_view(),
         name='register'),  # Register
    path('api/token/', accounts_views.MyTokenObtainPairView.as_view(),
         name='token'),  # Token
    path('api/authcheck/', accounts_views.CheckrefreshView.as_view(),
         name='Auth_check'),  # Auth check for refresh token
    path('api/logout/', accounts_views.LogoutView.as_view(),
         name='logout'),  # Logout
    path('api/resetpassword/', accounts_views.ResetpasswordView.as_view(),
         name='resetpassword'),  # change password

    path('api/createorder/', orders_views.OrderCreateViewSet.as_view(),
         name='order'),  # Create order
    path('api/orderlist/', orders_views.OrderListViewSet.as_view(),
         name='order_list'),  # List order
    path('api/orderhistory/', orders_views.OrderhistoryView.as_view(),
         name='order_history'),  # Order history


    path('api/admin_orders/', admin_views.Admin_ordersView.as_view(),
         name='admin_orders'),  # Admin orders
    path('api/admin_restaurants/', admin_views.Admin_restaurantsView.as_view(),
         name='admin_restaurants'),  # Admin restaurants
    path('api/admin_users/', admin_views.Admin_usersView.as_view(),
         name='admin_users'),  # Admin users

]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
