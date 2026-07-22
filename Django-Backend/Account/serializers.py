from rest_framework import serializers
from .models import Search, Favorite

from Recommender.serializers import ProjectSerializer

class SearchSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)
    timestamp = serializers.DateTimeField(format="%B %d, %Y (%A) %H:%M:%S")

    class Meta:
        model = Search
        fields = ['query', 'timestamp', 'projects']
