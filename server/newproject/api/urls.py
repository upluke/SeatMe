from django.urls import path 
from .views import get_bookings, create_booking

urlpatterns = [
    path('bookings/', get_bookings, name = 'get_bookings'),
    path('bookings/create/', create_booking, name='create_booking')
]
