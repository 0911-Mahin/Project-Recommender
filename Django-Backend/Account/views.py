from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

from .serializers import SearchSerializer, FavoriteSerializer
from .models import Favorite
from Recommender.models import Project


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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def searches(request):
    searches = request.user.searches.all()
    serializer = SearchSerializer(searches, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def favorites(request):
    favorites = request.user.favorites.all()
    serializer = FavoriteSerializer(favorites, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def add_favorite(request):
    project_id = request.data.get('project_id')
    if not project_id:
        return Response({"error": "Project ID is required."}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    try:
        project = Project.objects.get(id=project_id)
    except Project.DoesNotExist:
        return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

    favorite, created = Favorite.objects.get_or_create(user=request.user, project=project)
    if not created:
        return Response({"message": "Project is already in favorites."}, status=status.HTTP_200_OK)

    return Response({"message": "Project added to favorites."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def remove_favorite(request):
    project_id = request.data.get('project_id')
    if not project_id:
        return Response({"error": "Project ID is required."}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    try:
        favorite = Favorite.objects.get(user=request.user, project__id=project_id)
    except Favorite.DoesNotExist:
        return Response({"error": "Favorite not found."}, status=status.HTTP_404_NOT_FOUND)

    favorite.delete()
    return Response({"message": "Project removed from favorites."}, status=status.HTTP_200_OK)
