from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('searches/', views.searches, name='searches'),
    path('favorites/', views.favorites, name='favorites'),
    path('add_favorite/', views.add_favorite, name='add_favorite'),
    path('remove_favorite/', views.remove_favorite, name='remove_favorite'),
]
