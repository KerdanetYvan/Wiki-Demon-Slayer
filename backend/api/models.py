from django.db import models

# Create your models here.
class Personnage(models.Model):
    name = models.CharField(max_length=100)
    character_type = models.CharField(max_length=20)
    rank = models.CharField(max_length=50)
    description = models.CharField(max_length=2000, blank=True)
    image = models.ImageField(upload_to='characters/', blank=True, null=True)
    status = models.CharField(max_length=50)
    affiliation_id = models.ForeignKey('Affiliation', on_delete=models.CASCADE, related_name='personnages')
    breathing_style_id = models.ManyToManyField('BreathingStyle', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Personnage"
        verbose_name_plural = "Personnages"

class Affiliation(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    type = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Affiliation"
        verbose_name_plural = "Affiliations"

class BreathingStyle(models.Model):
    name = models.CharField(max_length=100)
    traducted_name = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=500, blank=True)
    derived_from = models.CharField(max_length=100, blank=True)
    sword_color = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Style de Souffle"
        verbose_name_plural = "Styles de Souffle"

class BloodDemonArt(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    ability_type = models.CharField(max_length=100)
    power_level = models.IntegerField()
    character_id = models.ForeignKey(Personnage, on_delete=models.CASCADE, related_name='blood_demon_arts')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Art Démoniaque"
        verbose_name_plural = "Arts Démoniaques"
        unique_together = ("character_id", "name")

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    item_type = models.CharField(max_length=50)
    rarity = models.CharField(max_length=50)
    image = models.ImageField(upload_to='items/', blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Objet"
        verbose_name_plural = "Objets"

class Technique(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    power_level = models.CharField(max_length=50)
    breathing_style_id = models.ForeignKey('BreathingStyle', on_delete=models.CASCADE, related_name='techniques')
    type = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Technique"
        verbose_name_plural = "Techniques"