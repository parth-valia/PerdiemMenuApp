# PerDiemMenu

React Native mobile menu browser for the Per Diem take-home. Connects to [`perdiem-menu-api`](../perdiem-menu-api) to display Square catalog items by location, with timezone-aware time/day availability, category filters, modifiers, cart, and inventory state.

---

## Quick start

```bash
# 1. Install JS dependencies
npm install

# 2. iOS — install pods
cd ios && pod install && cd ..

# 3. Start Metro bundler (new terminal)
npm start

# 4. Run on iOS simulator
npm run ios

# 5. Run on Android emulator
npm run android
```

> **Start `perdiem-menu-api` first** — it must be running on `localhost:3001` before launching the app.

---

## Environment

Copy `.env.example` to `.env` if you need to override the API URL (e.g., testing on a real device on your LAN):

```env
API_BASE_URL=http://192.168.x.x:3001/api/v1
```

Android emulator uses `http://10.0.2.2:3001/api/v1` to reach `localhost` on the host machine.

---

## Feature overview

- ✅ Location switcher
- ✅ Catalog fetch with location filtering
- ✅ Category filter pills
- ✅ Item detail — image, description, variations, price
- ✅ Loading skeletons (content-shaped, not bare spinners)
- ✅ Empty + error states with retry
- ✅ ⭐ Time/day availability — greyed out with reason
- ✅ Modifier lists on detail screen
- ✅ Full-text search across name + description
- ✅ Cart with subtotal (location-scoped)
- ✅ Out-of-stock surfacing via Inventory API

---

## Architecture decisions

### Redux Toolkit + RTK Query

RTK Query handles all server state (locations, catalog) with automatic caching and background refetch. Redux slices handle client state (selected location, active category filter, search query, cart). One store → one DevTools panel → no overlap between server and client state.

**Trade-off vs React Query:** slightly more boilerplate, but the unified store makes cart state, filter state, and API state all introspectable from one panel — invaluable during debugging.

### Availability computed on the server, displayed on the client

The backend resolves `CatalogAvailabilityPeriod` windows using the location's IANA timezone and returns `availableNow: boolean` + `availabilityReason: string`. The app renders unavailable items **greyed out with a contextual label** ("Available weekdays 11am–3pm") rather than hiding them.

This is a deliberate product decision: hiding items entirely creates confusion ("where did the breakfast menu go?"). Showing them greyed out with a reason is more trustworthy and lets guests plan ahead.

### Cart is location-scoped

Selecting a different location immediately clears the cart. This happens at the point of location selection (not deferred until the next item add) so a guest can never accidentally submit a mixed-location order. Matches DoorDash / Uber Eats behavior.

### Inventory is best-effort

If the Inventory API call fails, the menu still loads and items are assumed in stock. A guest can always proceed to checkout; the real stock check happens at order submission time.

---

## Folder structure

```text
src/
├── api/            # Axios client config + base URL
├── store/
│   ├── api/        # RTK Query endpoints (locations, catalog)
│   ├── slices/     # Location, catalog filters, cart
│   └── selectors/  # Memoized derived state
├── screens/        # One folder per route (Menu, ItemDetail, Cart, LocationSwitcher)
├── components/
│   ├── menu/       # CategoryPill, MenuCard, VariationSelector, ModifierSection
│   ├── cart/       # CartItemRow, CartBadge
│   ├── location/   # LocationCard
│   └── common/     # ErrorState, EmptyState, LoadingShell, ItemImage, StatusBadge
├── theme/          # Colors, Typography, Spacing tokens (design system)
├── types/          # Shared TypeScript interfaces
├── hooks/          # Typed useAppDispatch / useAppSelector
├── navigation/     # Stack navigator with type-safe params
└── utils/          # Currency formatting
```

---

## What I'd build next (given another week)

1. **Cart persistence** — MMKV or AsyncStorage so the cart survives a cold app restart
2. **Optimistic UI for cart** — instant feedback before the Redux update completes
3. **Search debouncing** — currently dispatches on every keystroke; debounce at ~200ms to cut Redux churn
4. **Image caching** — react-native-fast-image with disk cache so hero images don't re-download on scroll
5. **Push notifications** — notify guests when a sold-out item comes back in stock
