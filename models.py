from django.contrib.auth.models import User
from django.db import models

class MoodEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mood = models.CharField(max_length=20)
    date = models.DateField(auto_now_add=True)

class Journal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)