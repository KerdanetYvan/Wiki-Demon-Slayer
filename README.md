# Wiki Demon Slayer

*Ce projet est un projet scolaire pour but d'exploiter les technologies Django et React*
> Projet réalisé par Yvan KERDANET
> But du projet : Réalisation d'un site ressourçant les données sur les personnages de Demon Slayer et ce qu'ils utilisent

## Contrainte du projet

* Django = admin
* Django Rest Framework = api en lecture seule
* Vue ou React ou Angular = front, listes/détail/search/pagination/rebonds servi par Django -> stats
* Admin = export PDF d'une fiche, graphique matplotlib, Export de la base de données, générer des
* BDD = Oracle (via docker)
* Une table principale (7 champs minimum), une ou plusieurs 1-N, une ou plusieur N-N
* Projet solo, github partagé avec l'utilisateur rcarlier : dans le README, noté Nom/Prénom/sujet

## Structure de la base de données

### Table Principale : **Characters (Personnages)** 
*Table principale avec 7+ champs*

| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER (PK) | Identifiant unique |
| name | VARCHAR(100) | Nom du personnage |
| character_type | VARCHAR(20) | Type : "Slayer" ou "Demon" |
| rank | VARCHAR(50) | Rang (Hashira, Lower Moon, Upper Moon, etc.) |
| description | TEXT | Description du personnage |
| image_url | VARCHAR(255) | URL de l'image du personnage |
| status | VARCHAR(20) | Statut : "Alive" ou "Deceased" |
| affiliation_id | INTEGER (FK) | Référence vers l'organisation |
| created_at | DATETIME | Date de création |
| updated_at | DATETIME | Date de modification |

### Tables Secondaires

#### **Affiliations (Organisations)** - *Relation 1-N*
Organisations auxquelles appartiennent les personnages

| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER (PK) | Identifiant unique |
| name | VARCHAR(100) | Nom (ex: Demon Slayer Corps, Twelve Kizuki) |
| description | TEXT | Description de l'organisation |
| type | VARCHAR(50) | Type (Slayer, Demon, Neutral) |

**Relation** : Un personnage appartient à une organisation (1-N)

---

#### **Breathing_Styles (Techniques de respiration)** - *Relation N-N*
Styles de combat utilisés par les Slayers

| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER (PK) | Identifiant unique |
| name | VARCHAR(100) | Nom (ex: Water Breathing, Flame Breathing) |
| description | TEXT | Description du style |
| derived_from | INTEGER (FK) | Style parent (auto-référence) |
| color | VARCHAR(50) | Couleur associée |

**Table de liaison** : `Character_Breathing_Styles`
- character_id (FK)
- breathing_style_id (FK)

**Relation** : Un personnage peut maîtriser plusieurs styles, un style peut être utilisé par plusieurs personnages (N-N)

---

#### **Blood_Demon_Arts (Arts démoniaques)** - *Relation 1-N*
Pouvoirs spéciaux des démons

| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER (PK) | Identifiant unique |
| name | VARCHAR(100) | Nom du pouvoir |
| description | TEXT | Description détaillée |
| ability_type | VARCHAR(50) | Type (Offensive, Defensive, Support) |
| character_id | INTEGER (FK) | Référence vers le personnage démon |

**Relation** : Un démon possède un art démoniaque principal, un art peut être unique à un démon (1-N)

---

#### **Items (Objets et armes)** - *Relation N-N*
Équipements et armes utilisés

| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER (PK) | Identifiant unique |
| name | VARCHAR(100) | Nom de l'objet (ex: Nichirin Blade) |
| description | TEXT | Description |
| item_type | VARCHAR(50) | Type (Weapon, Armor, Accessory) |
| rarity | VARCHAR(20) | Rareté (Common, Rare, Legendary) |
| image_url | VARCHAR(255) | URL de l'image |

**Table de liaison** : `Character_Items`
- character_id (FK)
- item_id (FK)
- quantity (INTEGER)

**Relation** : Un personnage peut posséder plusieurs objets, un objet peut être possédé par plusieurs personnages (N-N)

---

#### **Techniques (Mouvements/Attaques)** - *Relation N-N*
Techniques spécifiques utilisées par les personnages

| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER (PK) | Identifiant unique |
| name | VARCHAR(100) | Nom de la technique |
| description | TEXT | Description |
| power_level | INTEGER | Niveau de puissance (1-10) |
| breathing_style_id | INTEGER (FK) | Style de respiration associé (nullable) |
| type | VARCHAR(50) | Type (Attack, Defense, Support) |

**Table de liaison** : `Character_Techniques`
- character_id (FK)
- technique_id (FK)
- mastery_level (INTEGER) | Niveau de maîtrise (1-100)

**Relation** : Un personnage utilise plusieurs techniques, une technique peut être utilisée par plusieurs personnages (N-N)

---

### Résumé des relations

```
Characters (1) ----< (N) Blood_Demon_Arts
Characters (N) >----< (N) Breathing_Styles
Characters (N) >----< (N) Items
Characters (N) >----< (N) Techniques
Characters (N) ----< (1) Affiliations
Breathing_Styles (1) ----< (N) Techniques
```

### Exemples de données

**Personnage Slayer** : Tanjiro Kamado
- Type: Slayer
- Rang: Demon Slayer
- Affiliation: Demon Slayer Corps
- Breathing Styles: Water Breathing, Sun Breathing
- Techniques: Water Surface Slash, Hinokami Kagura
- Items: Nichirin Blade (Black), Hanafuda Earrings

**Personnage Demon** : Muzan Kibutsuji
- Type: Demon
- Rang: Demon King
- Affiliation: Twelve Kizuki (Leader)
- Blood Demon Art: Biokinesis
- Items: None

