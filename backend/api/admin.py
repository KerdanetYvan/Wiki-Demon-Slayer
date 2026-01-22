from django.contrib import admin
from django.http.request import HttpRequest
from django.template.response import TemplateResponse
from django.utils.html import format_html
from django.urls import path, reverse
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from django.db.models import Count
from .models import Personnage, Affiliation, BreathingStyle, BloodDemonArt, Item, Technique
import matplotlib.pyplot as plt
import io

# Register your models here.
class PersonnageAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_photo', 'character_type', 'rank', 'status')
    search_fields = ('name', 'description')
    list_filter = ('affiliation_id', 'breathing_style_id', 'status')
    list_per_page = 20

    def display_photo(self, obj):
        if obj.image:
            return format_html(
                '<a href="{}"><img src="{}" width="100" /></a>',
                obj.image.url, obj.image.url
            )
        return "No Image"
    display_photo.short_description = "Photo" # type: ignore

    # ✅ 1) URL admin custom
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "<path:object_id>/export-pdf/",
                self.admin_site.admin_view(self.export_pdf_view),
                name="personnage_export_pdf",
            ),
        ]
        return custom_urls + urls

    # ✅ 2) Vue PDF
    def export_pdf_view(self, request, object_id):
        personnage = get_object_or_404(Personnage, pk=object_id)

        response = HttpResponse(content_type="application/pdf")
        filename = f"personnage_{personnage.pk}_{personnage.name}".replace(" ", "_")
        response["Content-Disposition"] = f'attachment; filename="{filename}.pdf"'

        c = canvas.Canvas(response, pagesize=A4) # type: ignore
        width, height = A4
        y = height - 50

        c.setFont("Helvetica-Bold", 18)
        c.drawString(50, y, f"Fiche Personnage — {personnage.name}")
        y -= 30

        c.setFont("Helvetica", 11)
        lines = [
            f"Type: {personnage.character_type}",
            f"Rang: {personnage.rank}",
            f"Statut: {personnage.status}",
            f"Affiliation: {personnage.affiliation_id.name if personnage.affiliation_id else '—'}",
        ]
        for line in lines:
            c.drawString(50, y, line)
            y -= 18

        # Styles de souffle (M2M)
        y -= 10
        c.setFont("Helvetica-Bold", 12)
        c.drawString(50, y, "Styles de souffle:")
        y -= 18
        c.setFont("Helvetica", 11)

        styles = personnage.breathing_style_id.all()
        if styles.exists():
            for s in styles:
                c.drawString(70, y, f"- {s.name}")
                y -= 16
                if y < 60:
                    c.showPage()
                    y = height - 50
                    c.setFont("Helvetica", 11)
        else:
            c.drawString(70, y, "—")
            y -= 16

        # Description
        y -= 10
        c.setFont("Helvetica-Bold", 12)
        c.drawString(50, y, "Description:")
        y -= 18
        c.setFont("Helvetica", 11)

        desc = (personnage.description or "").strip() or "—"
        for paragraph in desc.split("\n"):
            while len(paragraph) > 110:
                c.drawString(70, y, paragraph[:110])
                paragraph = paragraph[110:]
                y -= 16
                if y < 60:
                    c.showPage()
                    y = height - 50
                    c.setFont("Helvetica", 11)
            c.drawString(70, y, paragraph)
            y -= 16
            if y < 60:
                c.showPage()
                y = height - 50
                c.setFont("Helvetica", 11)

        c.showPage()
        c.save()
        return response

    # ✅ 3) Passer l’URL au template admin
    def change_view(self, request, object_id, form_url="", extra_context=None):
        extra_context = extra_context or {}
        if object_id:
            extra_context["export_pdf_url"] = reverse( #type: ignore
                "admin:personnage_export_pdf",
                args=[object_id],
            )
        return super().change_view(request, object_id, form_url, extra_context)
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
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "type-chart/",
                self.admin_site.admin_view(self.type_chart),
                name="item_type_chart",
            ),
            path(
                "rarity-chart/",
                self.admin_site.admin_view(self.rarity_chart),
                name="item_rarity_chart",
            )
        ]
        return custom_urls + urls
    
    def type_chart(self, request):
        qs = (
            Item.objects
            .values("item_type")
            .annotate(total=Count("id"))
            .order_by("-total")
        )

        labels = [(row["item_type"] or "Inconnu") for row in qs]
        values = [row["total"] for row in qs]
        
        fig, ax = plt.subplots()
        plt.title("Répartition des types d'objets")
        if not values:
            ax.text(0.5, 0.5, "Aucune donnée", ha="center", va="center")
            ax.axis("off")
        else:
            ax.pie(values, labels=labels, autopct="%1.0f%%")
            ax.axis("equal")
        
        buf = io.BytesIO()
        fig.savefig(buf, format="png", bbox_inches="tight")
        plt.close(fig)
        buf.seek(0)
        return HttpResponse(buf.getvalue(), content_type="image/png")

    
    def rarity_chart(self, request):
        qs = (
            Item.objects
            .values("rarity")
            .annotate(total=Count("id"))
            .order_by("-total")
        )

        labels = [(row["rarity"] or "Inconnu") for row in qs]
        values = [row["total"] for row in qs]
        
        fig, ax = plt.subplots()
        plt.title("Répartition des raretés d'objets")
        if not values:
            ax.text(0.5, 0.5, "Aucune donnée", ha="center", va="center")
            ax.axis("off")
        else:
            ax.pie(values, labels=labels, autopct="%1.0f%%")
            ax.axis("equal")
        
        buf = io.BytesIO()
        fig.savefig(buf, format="png", bbox_inches="tight")
        plt.close(fig)
        buf.seek(0)
        return HttpResponse(buf.getvalue(), content_type="image/png")
    
    def changelist_view(self, request: HttpRequest, extra_context=None):
        extra_context = extra_context or {}
        extra_context["type_chart"] = reverse("admin:item_type_chart")
        extra_context["rarity_chart"] = reverse("admin:item_rarity_chart")
        return super().changelist_view(request, extra_context=extra_context)
    
admin.site.register(Item, ItemAdmin)

class TechniqueAdmin(admin.ModelAdmin):
    list_display = ('name', 'power_level', 'breathing_style_id')
    search_fields = ('name', 'description')
    list_filter = ('breathing_style_id',)
admin.site.register(Technique, TechniqueAdmin)

