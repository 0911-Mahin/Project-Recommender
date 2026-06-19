from django.contrib import admin
from .models import Project

# Register your models here.
class ProjectAdmin(admin.ModelAdmin):
    filter_horizontal = ('skills_required',) 


admin.site.register(Project, ProjectAdmin)
