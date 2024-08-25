from django.urls import path 
from .views import get_bookings

urlpatterns = [
    path('bookings/', get_bookings, name = 'get_bookings')
]
