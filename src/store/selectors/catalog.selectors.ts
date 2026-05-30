import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { CatalogItem } from '@/types';
import { catalogApi } from '@/store/api/catalogApi';

// ─── Base selectors ───────────────────────────────────────────────────────────

const selectLocationId = (state: RootState) =>
  state.location.selectedLocationId;
const selectActiveCategoryId = (state: RootState) =>
  state.catalog.activeCategoryId;
const selectSearchQuery = (state: RootState) => state.catalog.searchQuery;

// Derives the current location's catalog from the RTK Query cache.
// All derived selectors compose from this one to avoid repeating the cache lookup.
const selectCatalogData = (state: RootState) => {
  const locationId = selectLocationId(state);
  if (!locationId) return undefined;
  return catalogApi.endpoints.getCatalog.select(locationId)(state).data;
};

// ─── Derived selectors ────────────────────────────────────────────────────────

export const selectFilteredItems = createSelector(
  selectCatalogData,
  selectActiveCategoryId,
  selectSearchQuery,
  (catalog, categoryId, query) => {
    if (!catalog) return [];

    let items: CatalogItem[] = catalog.items;

    if (categoryId) {
      const matched = items.filter(i => i.categoryId === categoryId);
      // If Square items lack categoryId data, fall back to showing all items
      // so the screen is never unexpectedly blank when a pill is tapped.
      if (matched.length > 0) items = matched;
    }

    if (query.trim()) {
      const lower = query.toLowerCase();
      items = items.filter(
        i =>
          i.name.toLowerCase().includes(lower) ||
          i.description.toLowerCase().includes(lower),
      );
    }

    return items;
  },
);

// Return all categories the API sends. Item→category linking depends on Square
// data setup — if items lack categoryId the pills still show but filtering
// shows all items (graceful degradation rather than hiding pills entirely).
export const selectCategories = createSelector(selectCatalogData, catalog => {
  if (!catalog) return [];
  return catalog.categories;
});

// Factory selector — memoize the result in the calling component with useMemo.
// E.g.: const sel = useMemo(() => selectItemById(id), [id]); useAppSelector(sel)
export const selectItemById = (itemId: string) =>
  createSelector(selectCatalogData, (catalog): CatalogItem | undefined =>
    catalog?.items.find(i => i.id === itemId),
  );
