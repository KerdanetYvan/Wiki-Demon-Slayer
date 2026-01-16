from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import Item

from .data import ITEMS_DATA  # ou colle le dict ici


class Command(BaseCommand):
    help = "Seed des objets de l'univers Demon Slayer"

    def add_arguments(self, parser):
        parser.add_argument(
            "--mode",
            choices=["create", "upsert"],
            default="upsert",
            help="create: ignore si existe | upsert: crée ou met à jour",
        )

    @transaction.atomic
    def handle(self, *args, **opts):
        mode = opts["mode"]
        created = updated = skipped = 0

        for item in ITEMS_DATA:
            defaults = {
                "description": item.get("description", ""),
                "item_type": item.get("item_type", "Inconnu"),
                "rarity": item.get("rarity", "Commun"),
            }

            if mode == "create":
                obj, was_created = Item.objects.get_or_create(
                    name=item["name"],
                    defaults=defaults,
                )
                if was_created:
                    created += 1
                else:
                    skipped += 1
            else:  # upsert
                obj, was_created = Item.objects.update_or_create(
                    name=item["name"],
                    defaults=defaults,
                )
                created += int(was_created)
                updated += int(not was_created)

        self.stdout.write(self.style.SUCCESS(
            f"Objets seedés — créés: {created}, maj: {updated}, ignorés: {skipped}"
        ))
