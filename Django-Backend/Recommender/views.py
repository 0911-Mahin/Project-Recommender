from datetime import datetime
import chromadb
from django.shortcuts import render
from rest_framework.decorators import api_view, throttle_classes
from sentence_transformers import SentenceTransformer
from functools import lru_cache
from pathlib import Path
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django.conf import settings

from .models import Project
from .serializers import ProjectSerializer
from Account.models import Search


@lru_cache(maxsize=1)
def get_model() -> SentenceTransformer:
    return SentenceTransformer("all-MiniLM-L6-v2")

@lru_cache(maxsize=1)
def get_collection():
    path = Path.joinpath(settings.BASE_DIR, "ChromaDB")
    client = chromadb.PersistentClient(path=path)
    return client.get_collection("Projects")


# Create your views here.
@api_view(['POST'])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def recommend(request):
    skills = request.data.get('skills', "")
    if not skills:
        return Response({"error": "Skills are required."}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    model = get_model()
    collection = get_collection()

    embeddings = model.encode(skills).tolist()

    results = collection.query(
        query_embeddings=[embeddings],
        n_results=100
    )

    ids = [id for i, id in enumerate(results['ids'][0]) if results['distances'][0][i] < 0.6]

    projects = Project.objects.filter(id__in=ids).prefetch_related('skills_required')

    if request.user.is_authenticated:
        search, created = Search.objects.get_or_create(user=request.user, query=skills)
        if not created:
            search.projects.clear()
            search.timestamp = datetime.now()
        search.projects.set(projects)
        if request.user.searches.count() > 10:
            oldest_search = request.user.searches.order_by('timestamp').first()
            oldest_search.delete()

    serialized_projects = ProjectSerializer(projects, many=True)

    return Response(serialized_projects.data)
