from django.urls import path, include
from .views import PersonnageViewSet, BreathingStyleViewSet, BloodDemonArtViewSet, ItemViewSet, TechniqueViewSet, AffiliationViewSet
from rest_framework import routers # type: ignore

router = routers.DefaultRouter()
router.register('personnages', PersonnageViewSet)
router.register('breathing_styles', BreathingStyleViewSet)
router.register('blood_demon_arts', BloodDemonArtViewSet)
router.register('items', ItemViewSet)
router.register('techniques', TechniqueViewSet)
router.register('affiliations', AffiliationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
