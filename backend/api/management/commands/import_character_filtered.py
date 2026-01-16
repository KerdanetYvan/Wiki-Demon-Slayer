import csv
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from api.models import Personnage, Affiliation, BreathingStyle


def norm(s: str) -> str:
    return (s or "").strip()


def split_list(s: str):
    """
    "Water Breathing, Hinokami Kagura" -> ["Water Breathing", "Hinokami Kagura"]
    "-" / "" -> []
    """
    s = norm(s)
    if not s or s == "-" or s.lower() == "none":
        return []
    return [part.strip() for part in s.split(",") if part.strip()]


class Command(BaseCommand):
    help = "Importe un CSV de personnages, crée/maj Affiliation + BreathingStyle + Personnage"

    def add_arguments(self, parser):
        parser.add_argument("csv_path", type=str)
        parser.add_argument(
            "--mode",
            choices=["create", "update", "upsert"],
            default="upsert",
            help="create=ajoute seulement, update=met à jour seulement, upsert=update ou create",
        )

    @transaction.atomic
    def handle(self, *args, **opts):
        path = Path(opts["csv_path"])
        if not path.exists():
            raise CommandError(f"Fichier introuvable: {path}")

        mode = opts["mode"]
        created = updated = skipped = 0

        with path.open("r", encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f)

            # ⚠️ Ton CSV a un header "Breathing Style " avec un espace à la fin.
            # On normalise les clés en strip() pour éviter les bugs.
            for raw_row in reader:
                row = { (k or "").strip(): (v or "").strip() for k, v in raw_row.items() }

                name = norm(row.get("Character Name"))
                if not name:
                    skipped += 1
                    continue

                race = norm(row.get("Race"))                 # -> character_type
                category = norm(row.get("Category"))         # -> rank
                affiliation_name = norm(row.get("Affiliation"))

                alias = norm(row.get("Alias"))
                abilities = norm(row.get("Abilities"))
                fighting_style = norm(row.get("Fighting Style"))
                demon_art = norm(row.get("Demon Art"))
                equipment = norm(row.get("Equipment"))
                fights = norm(row.get("Fights"))

                breathing_styles = split_list(row.get("Breathing Style"))  # clé normalisée

                # --- 1) Affiliation (FK)
                # On remplit ce qu'on peut : name + type (on met Category par défaut)
                affiliation_obj, _ = Affiliation.objects.get_or_create(
                    name=affiliation_name or "Unknown",
                    defaults={
                        "type": category or "Unknown",
                        "description": "",
                    },
                )

                # --- 2) BreathingStyle (M2M)
                bs_objects = []
                for bs_name in breathing_styles:
                    bs, _ = BreathingStyle.objects.get_or_create(name=bs_name)
                    bs_objects.append(bs)

                # --- 3) Construire une description "propre"
                desc_parts = []
                if alias and alias != "-":
                    desc_parts.append(f"Alias: {alias}")
                if abilities and abilities != "-":
                    desc_parts.append(f"Abilities: {abilities}")
                if fighting_style and fighting_style != "-":
                    desc_parts.append(f"Fighting style: {fighting_style}")
                if demon_art and demon_art != "-":
                    desc_parts.append(f"Demon art: {demon_art}")
                if equipment and equipment != "-":
                    desc_parts.append(f"Equipment: {equipment}")
                if fights and fights != "-":
                    desc_parts.append(f"Fights: {fights}")

                description = "\n".join(desc_parts) if desc_parts else ""

                # --- 4) Personnage (create/update/upsert)
                defaults = {
                    "character_type": race or "Unknown",
                    "rank": category or "Unknown",
                    "description": description,
                    "status": "Unknown",        # ton CSV ne donne pas de status fiable
                    "affiliation_id": affiliation_obj,
                    # "image": ... (non géré ici)
                }

                if mode == "create":
                    obj, was_created = Personnage.objects.get_or_create(name=name, defaults=defaults)
                    if was_created:
                        created += 1
                        if bs_objects:
                            obj.breathing_style_id.set(bs_objects)
                    else:
                        skipped += 1

                elif mode == "update":
                    qs = Personnage.objects.filter(name=name)
                    if qs.exists():
                        obj = qs.first()
                        for k, v in defaults.items():
                            setattr(obj, k, v)
                        obj.save()
                        obj.breathing_style_id.set(bs_objects)
                        updated += 1
                    else:
                        skipped += 1

                else:  # upsert
                    obj, was_created = Personnage.objects.update_or_create(name=name, defaults=defaults)
                    obj.breathing_style_id.set(bs_objects)
                    created += int(was_created)
                    updated += int(not was_created)

        self.stdout.write(self.style.SUCCESS(
            f"Import terminé — créés: {created}, mis à jour: {updated}, ignorés: {skipped}"
        ))
