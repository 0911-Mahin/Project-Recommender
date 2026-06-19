from django.contrib import admin
from .models import Search, Favorite

# Register your models here.
class SearchAdmin(admin.ModelAdmin):
    filter_horizontal = ('projects',)

class FavoriteAdmin(admin.ModelAdmin):
    pass

admin.site.register(Search, SearchAdmin)
admin.site.register(Favorite, FavoriteAdmin)