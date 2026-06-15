from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    skills_required = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ['title', 'description', 'skills_required', 'difficulty']
