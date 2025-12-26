# Project Concept: Willemstad Interactieve Stadsgids

Dit document beschrijft de inhoudelijke visie, het ontwerp en de functionaliteit van de applicatie. Het dient als leidraad voor design- en contentkeuzes.

## 1. Visie & Doel

De applicatie is een **offline-first Progressive Web App (PWA)** die bezoekers van Willemstad (Curaçao) begeleidt. Het combineert interactieve kaarten, wandelroutes en Augmented Reality (AR) om de rijke historie en cultuur van de stad tot leven te brengen, zelfs zonder internetverbinding.

**Kernwaarden:**

- **Offline First:** De app moet volledig functioneel zijn zonder dataverbinding (essentieel voor toeristen zonder roaming).
- **Locatie-gedreven:** Content wordt aangeboden op basis van de GPS-locatie van de gebruiker.
- **Interactief:** Gebruik van 3D en AR om gebouwen en verhalen te visualiseren.

## 2. Doelgroep

- Toeristen in Willemstad (cruise-passagiers, verblijfstoeristen).
- Lokale bewoners die hun stad willen herontdekken.
- Geschiedenis- en cultuurliefhebbers.

## 3. Design & Look-and-Feel

De visuele stijl is modern, tropisch en toegankelijk:

- **Kleurenpalet:** Geïnspireerd door de kleurrijke handelskade (geel, blauw, rood), maar met voldoende witruimte voor leesbaarheid.
- **Interface:** Grote touch-targets (mobile-first), duidelijke kaarten en intuïtieve navigatie.
- **Kaarten:** Custom styled kaarten (MapLibre/Leaflet) die passen bij de branding.

## 4. Sitemap & Navigatie

De app heeft een tab-based navigatie voor snelle toegang:

### 1. Explore (Kaart)

- **Doel:** Ontdekken van POI's (Points of Interest) in de buurt.
- **Elementen:**
  - Interactieve kaart met markers voor locaties.
  - "In de buurt" lijstweergave.
  - Filter op categorie (Historie, Eten, Kunst).

### 2. Routes (Wandelingen)

- **Doel:** Volgen van gecureerde wandelroutes.
- **Elementen:**
  - Lijst van beschikbare routes (bijv. "Punda Highlights", "Street Art Route").
  - Detailweergave met routekaart, duur en afstand.
  - Stap-voor-stap navigatie.

### 3. Deals (Coupons)

- **Doel:** Aanbieden van lokale kortingen en acties.
- **Elementen:**
  - Lijst van actieve deals in de buurt.
  - QR-codes of coupons om te verzilveren.

### 4. Profiel / Settings

- **Doel:** Beheer van offline data en voorkeuren.
- **Elementen:**
  - Download status van offline content.
  - Taalinstellingen.

## 5. Content Model (Strapi)

De content wordt beheerd in Strapi v5 met de volgende structuur:

- **Collection Type: `Location`**

  - `title` (Text)
  - `description` (Rich Text)
  - `coordinates` (JSON/Component - lat/long)
  - `category` (Enumeration/Relation)
  - `media` (Media - foto's, 3D modellen)
  - `ar_content` (Media - .glb/.gltf bestanden)

- **Collection Type: `Route`**

  - `title` (Text)
  - `description` (Text)
  - `locations` (Relation - ordered list of Locations)
  - `duration` (Number - minuten)
  - `distance` (Number - meters)

- **Collection Type: `Deal`**
  - `title` (Text)
  - `description` (Text)
  - `location` (Relation - linked to a Location)
  - `valid_until` (Date)

## 6. Roadmap / Wishlist

- [ ] Offline caching implementatie (Service Workers).
- [ ] GPS tracking en "You are here" functionaliteit.
- [ ] AR viewer integratie (`<model-viewer>`).
- [ ] Meertaligheid (i18n) voor toeristen.
