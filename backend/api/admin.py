from django.contrib import admin
from django.utils.html import format_html
from .models import Personnage, Affiliation, BreathingStyle, BloodDemonArt, Item, Technique

# Register your models here.
class PersonnageAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_photo', 'character_type', 'rank', 'status')
    search_fields = ('name', 'description')
    list_filter = ('affiliation_id', 'breathing_style_id', 'status')
    list_per_page = 20
    
    def display_photo(self, obj):
        if obj.image:
            return format_html('<a href="{}"><img src="{}" width="100" /></a>', obj.image.url, obj.image.url)
        return "No Image"
admin.site.register(Personnage, PersonnageAdmin)

class AffiliationAdmin(admin.ModelAdmin):
    list_display = ('name', 'type')
    search_fields = ('name',)
admin.site.register(Affiliation, AffiliationAdmin)

class BreathingStyleAdmin(admin.ModelAdmin):
    list_display = ('name', 'traducted_name', 'derived_from', 'sword_color')
    search_fields = ('name', 'traducted_name')
admin.site.register(BreathingStyle, BreathingStyleAdmin)

class BloodDemonArtAdmin(admin.ModelAdmin):
    list_display = ('name', 'ability_type', 'power_level', 'character_id')
    search_fields = ('name', 'description')
    list_filter = ('ability_type',)
admin.site.register(BloodDemonArt, BloodDemonArtAdmin)

class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_image', 'item_type', 'rarity')
    search_fields = ('name', 'description')
    list_filter = ('item_type', 'rarity')
    
    def display_image(self, obj):
        if obj.image:
            return format_html('<a href="{}"><img src="{}" width="100" /></a>', obj.image.url, obj.image.url)
        return "No Image"
admin.site.register(Item, ItemAdmin)

class TechniqueAdmin(admin.ModelAdmin):
    list_display = ('name', 'power_level', 'breathing_style_id')
    search_fields = ('name', 'description')
    list_filter = ('breathing_style_id',)
admin.site.register(Technique, TechniqueAdmin)