# PerDiemMenu

React Native mobile menu browser for the Per Diem take-home challenge.

Connects to [`perdiem-menu-api`](../perdiem-menu-api) to display Square catalog items by location. Core features: location switcher, category filter pills, item detail with variations and modifiers, full-text search, cart with subtotal, timezone-aware time/day availability, and out-of-stock surfacing via the Inventory API.

---

## Quick start

> **Start `perdiem-menu-api` first** — the app has no data without it.

```bash
# 1. Install JS dependencies
npm install

# 2. iOS — install native pods
cd ios && pod install && cd ..

# 3. Start Metro bundler (keep this terminal open)
npm start

# 4. Run on iOS simulator (new terminal)
npm run ios

# 5. Run on Android emulator (new terminal)
npm run android
```

---

## Environment

The app points to `http://localhost:3001/api/v1` by default. Override for a real device on your LAN:

```env
API_BASE_URL=http://192.168.x.x:3001/api/v1
```

Android emulator reaches the host machine at `http://10.0.2.2:3001/api/v1`.

Copy `.env.example` to `.env` — no Square credentials are needed here. The token lives exclusively in the backend.

---

## Features implemented

### Core requirements (all 6)

- Location switcher with loading and error states
- Catalog fetch filtered to the selected location
- Category filter pills with time/day availability indicators
- Item detail — hero image, name, description, variations, modifier lists, formatted price
- Content-shaped loading skeletons (not bare spinners)
- Empty and error states with retry on every screen

### Bonus features

- ⭐ Time/day availability — greyed out with a human-readable reason ("Available Mon–Fri 11am–3pm")
- Modifier lists on the detail screen (single-select and multi-select)
- Full-text search across item name and description
- Cart with location-scoped subtotal (computed in cents to avoid floating-point drift)
- Out-of-stock surfacing via Square's Inventory API

---

## Architecture decisions

### State management — Redux Toolkit + RTK Query

RTK Query handles all server state (locations, catalog) with automatic caching and background refetch. Redux slices handle client state (selected location, active category filter, search query, cart). A single store means one Redux DevTools panel for everything — server cache, filters, and cart are all introspectable together.

**Trade-off vs React Query:** more boilerplate, but the unified store is invaluable when debugging state interactions (e.g. "why is this filter not clearing the search?").

### Availability — computed on the server, rendered on the client

The backend resolves `CatalogAvailabilityPeriod` windows against the current time in the location's IANA timezone. The app receives `availableNow: boolean` and `availabilityReason: string` — no timezone logic on the client, no extra libraries.

**Product decision:** unavailable items are greyed out with a reason label rather than hidden. Hiding creates confusion ("where did the breakfast menu go?"). Greying out with a reason builds trust and lets guests plan ahead.

### Cart is location-scoped

Selecting a different location immediately clears the cart (dispatched in `LocationSwitcherScreen.handleSelect` before the new location is set). A guest can never accumulate a mixed-location order.

Subtotal is computed in integer cents across the entire cart and formatted only at display time — no floating-point arithmetic on money.

### Inventory is best-effort

If the Inventory API call fails the menu still loads. Variations default to `inStock: true` when the backend cannot confirm stock. The real stock check happens at order submission a best-effort display is better than blocking the menu on an upstream hiccup.

### Component and screen separation

Screens own: data fetching (RTK Query hooks), navigation handlers, Redux dispatch calls, and top-level layout assembly.

Components own: rendering logic, local styles, and their own `StyleSheet`. No component imports from a screen's `styles.ts` each component carries its own styles.

---

## Folder structure

```text
src/
├── api/            Axios client — base URL, response envelope unwrapping
├── store/
│   ├── api/        RTK Query endpoints (locations, catalog)
│   ├── slices/     Redux slices — location, catalog filters, cart
│   └── selectors/  Memoized derived state (filtered items, subtotal)
├── screens/        One folder per route — index.tsx + styles.ts
├── components/
│   ├── menu/       MenuCard, MenuHeader, MenuSearchBar, MenuFilterBar,
│   │               MenuFilterBar, ItemHero, ItemDetailCTA,
│   │               CategoryPill, VariationSelector, ModifierSection
│   ├── cart/       CartBadge, CartHeader, CartItemRow, CartSummary
│   ├── location/   LocationCard, LocationSwitcherHeader
│   └── common/     EmptyState, ErrorState, LoadingShell, ItemImage, StatusBadge
├── theme/          Colors, Typography (Plus Jakarta Sans), Spacing tokens
├── types/          Shared TypeScript interfaces mirroring the API contract
├── hooks/          Typed useAppDispatch / useAppSelector
├── navigation/     Stack navigator with type-safe route params
└── utils/          formatCents — money formatting without floating-point drift
```

---

## Security

- No Square SDK imported in the app — all Square calls are proxied through `perdiem-menu-api`
- No access token anywhere in the app source or `.env.example`
- The app only stores user selections (location, cart) in Redux — nothing sensitive persisted

---

## TypeScript

- Strict mode enabled in `tsconfig.json`
- No `any` types, no `@ts-ignore`
- `@typescript-eslint/no-explicit-any: error` enforced in `.eslintrc.js`
- All API response shapes are modelled in `src/types/index.ts`

---

## What I'd build next (given another week)

1. **Cart persistence** — MMKV or AsyncStorage so the cart survives a cold app restart
2. **Search debouncing** — debounce at ~200 ms to reduce Redux updates per keystroke
3. **Image caching** — react-native-fast-image with disk cache so hero images don't re-download on scroll
4. **Optimistic UI for cart** — instant feedback before the Redux state update settles
5. **Unit tests for selectors** — `selectFilteredItems` and `selectCartSubtotalCents` are pure functions easy to test and high value
