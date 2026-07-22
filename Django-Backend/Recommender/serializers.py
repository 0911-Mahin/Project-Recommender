from rest_framework import serializers

from Account.models import Favorite
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    skills_required = serializers.StringRelatedField(many=True)
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'skills_required', 'difficulty', 'is_favorited']

    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if not request or not getattr(request, 'user', None) or not request.user.is_authenticated:
            return False

        return Favorite.objects.filter(user=request.user, project=obj).exists()
