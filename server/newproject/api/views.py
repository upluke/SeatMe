# build api endpoints

from rest_framework.decorators import api_view 
from rest_framework.response import Response 
from rest_framework import status 
from .models import Book 
from .serializer import BookSerializer

@api_view(['GET'])
def get_bookings(request):
    bookings = Book.objects.all()
    serializedData = BookSerializer(bookings, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_booking(request):
    data = request.data 
    serializer = BookSerializer(data= data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)