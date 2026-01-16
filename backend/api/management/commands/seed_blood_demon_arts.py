from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import Personnage, BloodDemonArt

# colle BLOOD_DEMON_ARTS ici (ou importe-le depuis un fichier)
from .data import BLOOD_DEMON_ARTS  # optionnel


class Command(BaseCommand):
    help = "Seed/MAJ des Arts Démoniaques (BloodDemonArt) liés aux Personnages démons"

    def add_arguments(self, parser):
        parser.add_argument(
            "--mode",
            choices=["create", "upsert"],
            default="upsert",
            help="create: n'ajoute que si absent | upsert: crée ou met à jour",
        )

    @transaction.atomic
    def handle(self, *args, **opts):
        mode = opts["mode"]

        created = updated = skipped = missing = 0

        for demon_name, arts in BLOOD_DEMON_ARTS.items():
            perso = Personnage.objects.filter(name=demon_name).first()
            if not perso:
                missing += 1
                self.stdout.write(self.style.WARNING(
                    f"Personnage introuvable: '{demon_name}' (arts ignorés)"
                ))
                continue

            for art in arts:
                defaults = {
                    "description": art.get("description", ""),
                    "ability_type": art.get("ability_type", "Inconnu"),
                    "power_level": int(art.get("power_level", 1)),
                    "character_id": perso,
                }

                # Clé d’unicité pratique: (character_id + name)
                if mode == "create":
                    obj, was_created = BloodDemonArt.objects.get_or_create(
                        character_id=perso,
                        name=art["name"],
                        defaults=defaults,
                    )
                    if was_created:
                        created += 1
                    else:
                        skipped += 1
                else:  # upsert
                    obj, was_created = BloodDemonArt.objects.update_or_create(
                        character_id=perso,
                        name=art["name"],
                        defaults=defaults,
                    )
                    created += int(was_created)
                    updated += int(not was_created)

        self.stdout.write(self.style.SUCCESS(
            f"Seed terminé — créés: {created}, maj: {updated}, ignorés: {skipped}, personnages manquants: {missing}"
        ))
