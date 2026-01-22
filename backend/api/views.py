from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets, filters # type: ignore
from .serializers import PersonnageSerializer, AffiliationSerializer, BreathingStyleSerializer, BloodDemonArtSerializer, ItemSerializer, TechniqueSerializer
from .models import Personnage, Affiliation, BreathingStyle, BloodDemonArt, Item, Technique

# Create your views here.
class PersonnageViewSet(viewsets.ModelViewSet):
    queryset = Personnage.objects.all()
    serializer_class = PersonnageSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'role', 'affiliation__name']
    
class AffiliationViewSet(viewsets.ModelViewSet):
    queryset = Affiliation.objects.all()
    serializer_class = AffiliationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'type']
    
class BreathingStyleViewSet(viewsets.ModelViewSet):
    queryset = BreathingStyle.objects.all()
    serializer_class = BreathingStyleSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'traducted_name']
    
class BloodDemonArtViewSet(viewsets.ModelViewSet):
    queryset = BloodDemonArt.objects.all()
    serializer_class = BloodDemonArtSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'ability_type', 'character__name']
    
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'type']
    
class TechniqueViewSet(viewsets.ModelViewSet):
    queryset = Technique.objects.all()
    serializer_class = TechniqueSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']