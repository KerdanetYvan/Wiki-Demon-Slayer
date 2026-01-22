from rest_framework import serializers # type: ignore
from .models import Personnage, Affiliation, BreathingStyle, BloodDemonArt, Item, Technique

class PersonnageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personnage
        fields = "__all__"
        
class AffiliationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Affiliation
        fields = "__all__"
        
class BreathingStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreathingStyle
        fields = "__all__"
        
class BloodDemonArtSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodDemonArt
        fields = "__all__"
        
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"
        
class TechniqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technique
        fields = "__all__"
