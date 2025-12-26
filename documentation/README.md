# Project Documentatie: Strapi + React Headless CMS

Deze documentatie beschrijft de architectuur, technische stack en setup van de frontend applicatie. Dit project is een moderne, headless CMS implementatie die content ophaalt uit Strapi 5 en weergeeft via een React 19 (via Vite) frontend.

De content wordt beheerd in Strapi 5 op Strapi Cloud, de frontend wordt als Vite‑build gedeployed op Vercel via GitHub.

## 1. Technische Stack

### Frontend Core

- **Framework:** [React 18.3+](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/) (razendsnelle build & HMR)
- **PWA:** `vite-plugin-pwa` voor offline support en installatie.
- **Language:** [TypeScript](https://www.typescriptlang.org/) (voor type safety en betere DX)
- **Routing:** [React Router v6](https://reactrouter.com/)

### Styling & UI

- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Maps:** MapLibre GL of React Leaflet (interactieve kaarten).
- **3D/AR:** `@google/model-viewer` (voor 3D objecten en AR).
- **Utilities:** `clsx` en `tailwind-merge` voor conditionele classnames.

### Data & State Management

- **Data Fetching:** [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
  - Verzorgt caching, loading states, en error handling.
  - **Offline:** Geconfigureerd met persist opties (localStorage/IndexedDB) voor offline beschikbaarheid.
- **API Client:** Native `fetch` met custom typed wrappers in `src/api/strapi.ts`.

### Content Rendering

- **Markdown:** `react-markdown` voor het renderen van rich text uit Strapi.
- **Sanitization:** `isomorphic-dompurify` voor het veilig renderen van HTML (indien nodig).
- **Dynamic Blocks:** Custom `BlockRenderer` component voor Strapi Dynamic Zones.

### Kwaliteit & Tooling

- **Linting:** ESLint (met `jsx-a11y` voor toegankelijkheid).
- **Formatting:** Prettier (via ESLint config).
- **Git Hooks:** Husky (gepland) voor pre-commit checks.

---

## 2. Architectuur & Structuur

De applicatie volgt een modulaire structuur, geoptimaliseerd voor schaalbaarheid.

```
src/
├── api/                # API definities en types
│   └── strapi.ts       # Centrale plek voor Strapi calls & Type definities
├── components/
│   ├── blocks/         # Componenten voor Strapi Dynamic Zones (RichText, Slider, etc.)
│   ├── ui/             # Herbruikbare UI componenten (Skeleton, Buttons)
│   ├── ResponsiveHeader.tsx
│   ├── StrapiImage.tsx # Slimme image wrapper voor Strapi media formats
│   └── BlockRenderer.tsx # Factory component die de juiste block component kiest
├── lib/                # Helper functies (utils.ts)
├── pages/              # Pagina componenten (Home, ArticleDetail)
├── App.tsx             # Main routing configuratie
└── main.tsx            # Entry point
```

### Belangrijke Componenten

#### `BlockRenderer.tsx`

Dit is het hart van de content weergave. Strapi stuurt content vaak terug als een lijst van "blokken" (Dynamic Zones). De `BlockRenderer` loopt door deze lijst en rendert het juiste React component op basis van het `__component` veld (bijv. `shared.rich-text` -> `<RichText />`).

#### `StrapiImage.tsx`

Een geavanceerde image component die automatisch gebruik maakt van de verschillende formaten (thumbnail, small, medium, large) die Strapi genereert. Het genereert een `srcset` attribuut zodat de browser automatisch de meest optimale afbeeldingsgrootte kiest voor het apparaat van de gebruiker.

#### `api/strapi.ts`

Bevat de TypeScript interfaces voor de Strapi data structuur (`Article`, `StrapiImage`, etc.) en de functies om data op te halen. Hier wordt ook de data genormaliseerd (het "flattenen" van de geneste `data.attributes` structuur van Strapi v4/v5).

---

## 3. Setup & Installatie

### Vereisten

- Node.js v20+
- NPM

### Installatie stappen

1. **Clone de repository:**

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Installeer dependencies:**

   ```bash
   npm install
   ```

   _Of gebruik het setup script:_

   ```bash
   ./setup.sh
   ```

3. **Configureer Environment Variabelen:**

   Maak een `.env` bestand aan in de root van het project:

   ```env
   VITE_STRAPI_URL=https://wealthy-flower-7b2d8b4969.strapiapp.com
   ```

4. **Start de development server:**
   ```bash
   npm run dev
   ```
   De applicatie draait nu op `http://localhost:5173`.

### Build voor productie

```bash
npm run build
```

Dit genereert een geoptimaliseerde build in de `dist/` map, klaar voor deployment op Vercel.

---

## 4. Backend Integratie (Strapi)

De frontend verwacht een Strapi backend met de volgende structuur:

- **Base URL:** Geconfigureerd via environment variabele `VITE_STRAPI_URL`.
- **Collection Types:**
  - `Location`: POI's met GPS-coördinaten, titel, beschrijving en media.
  - `Route`: Wandelingen met een lijst van locaties en route-informatie.
  - `Deal`: Coupons of aanbiedingen gekoppeld aan locaties.
- **API Toegang:** De endpoints voor deze collecties moeten publiek toegankelijk zijn (`find` en `findOne` permissies).
  > Zorg in Strapi onder _Users & Permissions → Roles → Public_ dat `find` en `findOne` zijn ingeschakeld voor de nieuwe types, anders kan de frontend de API niet benaderen.

---

## 5. Best Practices in dit project

1.  **Offline First:** De app mag nooit een wit scherm tonen als de verbinding wegvalt; data moet agressief gecacht worden.
2.  **Mobile First Styling:** We gebruiken Tailwind CSS met een mobile-first benadering (basis classes zijn voor mobiel, `md:` en `lg:` voor grotere schermen).
3.  **Type Safety:** We vermijden `any` waar mogelijk. API responses zijn getypeerd zodat we autocomplete hebben in de IDE en fouten tijdens development vangen.
4.  **Component Composition:** Grote pagina's zijn opgeknipt in kleinere, herbruikbare componenten.
5.  **Accessibility:** We gebruiken semantische HTML (`<header>`, `<main>`, `<article>`, `<nav>`) en aria-labels waar nodig.
