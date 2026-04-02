from rest_framework import serializers
from .models import MoodEntry, Journal

class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = '__all__'

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = '__all__'