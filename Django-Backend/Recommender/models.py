from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    skills_required = models.ManyToManyField(Skill)
    difficulty = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.difficulty}: {self.title}"
