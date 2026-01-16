from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import BreathingStyle, Technique
from .data import BREATHING_TECHNIQUES  # ou import direct si dans le même fichier


class Command(BaseCommand):
    help = "Seed automatique des techniques pour tous les BreathingStyles"

    def add_arguments(self, parser):
        parser.add_argument(
            "--mode",
            choices=["create", "upsert"],
            default="upsert",
            help="create: ignore si existe, upsert: crée ou met à jour",
        )

    @transaction.atomic
    def handle(self, *args, **opts):
        mode = opts["mode"]

        total_styles = total_created = total_updated = total_skipped = 0

        for style_name, style_data in BREATHING_TECHNIQUES.items():
            # --- 1) BreathingStyle
            style, style_created = BreathingStyle.objects.get_or_create(
                name=style_name,
                defaults={
                    "traducted_name": style_data.get("traducted_name", ""),
                    "description": style_data.get("description", ""),
                },
            )

            total_styles += 1
            self.stdout.write(self.style.NOTICE(f"→ {style.name}"))

            # --- 2) Techniques
            for name, desc, power, ttype in style_data["techniques"]:
                defaults = {
                    "description": desc,
                    "power_level": power,
                    "type": ttype,
                    "breathing_style_id": style,
                }

                if mode == "create":
                    obj, was_created = Technique.objects.get_or_create(
                        breathing_style_id=style,
                        name=name,
                        defaults=defaults,
                    )
                    if was_created:
                        total_created += 1
                    else:
                        total_skipped += 1
                else:  # upsert
                    obj, was_created = Technique.objects.update_or_create(
                        breathing_style_id=style,
                        name=name,
                        defaults=defaults,
                    )
                    total_created += int(was_created)
                    total_updated += int(not was_created)

        self.stdout.write(self.style.SUCCESS(
            f"\nSeed terminé — styles: {total_styles}, "
            f"créées: {total_created}, "
            f"maj: {total_updated}, "
            f"ignorées: {total_skipped}"
        ))
