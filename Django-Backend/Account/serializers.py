from rest_framework import serializers
from .models import Search, Favorite

from Recommender.serializers import ProjectSerializer

class SearchSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = Search
        fields = ['query', 'projects']
