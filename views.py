from rest_framework import viewsets
from .models import MoodEntry, Journal
from .serializer import MoodSerializer, JournalSerializer
from rest_framework.permissions import IsAuthenticated

class MoodViewSet(viewsets.ModelViewSet):
    serializer_class = MoodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Mood.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class JournalViewSet(viewsets.ModelViewSet):
    serializer_class = JournalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Journal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MoodViewSet(viewsets.ModelViewSet):
    queryset = MoodEntry.objects.all()
    serializer_class = MoodSerializer

class JournalViewSet(viewsets.ModelViewSet):
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer