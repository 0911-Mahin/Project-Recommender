from django.db import models
from django.contrib.auth.models import User

from Recommender.models import Project

# Create your models here.
class Search(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='searches')
    query = models.CharField(max_length=255)
    projects = models.ManyToManyField(Project, related_name='searches')
    timestamp = models.DateTimeField(auto_now_add=True)

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='favorites')
    timestamp = models.DateTimeField(auto_now_add=True)
