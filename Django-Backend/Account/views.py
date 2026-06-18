from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not password or not email:
        return Response({"error": "Username, email, and password are required."}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
        return Response({"error": "Username or Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
