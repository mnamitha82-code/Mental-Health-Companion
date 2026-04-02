from rest_framework.routers import DefaultRouter
from .views import MoodViewSet, JournalViewSet

router = DefaultRouter()
router.register(r'moods', MoodViewSet)
router.register(r'journals', JournalViewSet)

urlpatterns = router.urls