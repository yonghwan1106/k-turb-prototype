# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

K-TURB is a real-time turbulence prediction platform prototype for aviation weather forecasting in Korea. Built for the Aviation Weather Idea Contest, this is a **prototype** demonstrating UI/UX and AI integration capabilities without actual meteorological data connections.

**Key Technologies:**
- Next.js 14 (App Router) with TypeScript
- React Three Fiber for 3D visualization
- Anthropic Claude API for AI weather briefing
- Zustand for state management
- Tailwind CSS v4 with @tailwindcss/postcss

## Development Commands

```bash
# Development server (auto-finds available port if 3000 is occupied)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### State Management Pattern

Global state is managed with Zustand in `src/store/useStore.ts`. The store contains:
- `timeOffset`: Minutes from current time (0-360 for 6-hour forecast)
- `selectedTime`: Computed time based on offset
- `isPlaying`: Auto-play state for timeline animation
- `turbulenceData`: Simulated turbulence data points
- `selectedAltitude`: Current altitude filter (in feet)
- `selectedAirport`: Currently selected airport code

**Important:** When updating time-related state, avoid infinite render loops by:
1. Using `useMemo` for computed time values
2. Not including computed `Date` objects in useEffect dependencies
3. Only depending on primitive values (`timeOffset`) instead of derived objects

### 3D Rendering Strategy

React Three Fiber components **must be dynamically imported** with SSR disabled:

```typescript
const Korea3DMap = dynamic(() => import('@/components/map/Korea3DMap'), {
  ssr: false,
  loading: () => <LoadingComponent />
})
```

This prevents server-side rendering errors with WebGL contexts and Three.js.

### API Route Structure

Claude API integration is in `src/app/api/briefing/route.ts`:
- Accepts `POST` with `{ departure, arrival, language }`
- Returns `{ briefing: string }` with AI-generated aviation weather briefing
- Requires `ANTHROPIC_API_KEY` in `.env.local`
- Uses Claude Sonnet 4 model: `claude-sonnet-4-20250514`

## Key Architectural Decisions

### React 18 vs 19

This project uses React 18.3.1 (not React 19) because:
- React Three Fiber v9.3.0 has compatibility issues with React 19
- React 19's reconciler changes break the Three.js integration
- If upgrading Three.js dependencies, verify React version compatibility first

### Tailwind CSS v4 Configuration

Tailwind CSS v4 requires different setup than v3:
- Use `@import "tailwindcss"` in `globals.css` (not `@tailwind` directives)
- PostCSS plugin: `@tailwindcss/postcss` (not `tailwindcss` directly)
- Configuration is simplified in `tailwind.config.ts` (no `Config` type import needed)

Custom turbulence colors are defined in the theme:
- `turb-green`: #4CAF50 (safe)
- `turb-yellow`: #FFC107 (caution)
- `turb-orange`: #FF9800 (warning)
- `turb-red`: #F44336 (danger)
- `turb-blue`: #2196F3 (brand)

### Data Flow Architecture

1. **Simulation Data** (`src/lib/turbulence.ts`):
   - `generateTurbulenceData()`: Creates patterned turbulence points with time-based variation
   - `getTurbulenceLevel()`: Maps intensity (0-100) to severity levels
   - Data is deterministic but appears realistic for demo purposes

2. **Airport Data** (`src/data/airports.ts`):
   - 8 major Korean airports with coordinates and metadata
   - Lat/lon are transformed to 3D coordinates in `Korea3DMap` component
   - Coordinate system: centered on Korea with custom projection

3. **3D Scene Organization**:
   - `KoreaMapMesh`: Base terrain (green plane representing land)
   - `TurbulenceLayer`: Animated circular meshes showing turbulence zones
   - `AirportMarkers`: Spheres with cylindrical stems at airport locations
   - Lighting: Ambient (0.6) + two directional lights for depth

## Environment Variables

Required in `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Known Limitations (Prototype)

- No real meteorological data integration
- Turbulence simulation uses sine waves + random noise
- AI briefings are generated based on airport codes alone (no actual weather)
- 3D map is a simplified plane (not actual Korean terrain)
- Time synchronization uses client-side `Date()` (not server time)

## Component Hierarchy

```
page.tsx (main dashboard)
├── Korea3DMap (dynamic import, SSR disabled)
│   ├── KoreaMapMesh
│   ├── TurbulenceLayer
│   └── AirportMarkers
├── TimeSlider (controls time offset state)
└── AIBriefing (calls /api/briefing endpoint)
```

## Troubleshooting

**If you see "Cannot read properties of undefined (reading 'S')":**
- React Three Fiber version mismatch with React
- Ensure React is pinned to 18.x
- Clear `.next` cache and restart dev server

**If Tailwind styles don't apply:**
- Verify `@import "tailwindcss"` is in `globals.css`
- Check `postcss.config.js` uses `@tailwindcss/postcss`
- Restart dev server after config changes

**If infinite render loop in TimeSlider:**
- Check useEffect dependencies exclude computed Date objects
- Ensure `baseTime` is wrapped in `useState` to prevent recreation
- Use `useMemo` for time calculations