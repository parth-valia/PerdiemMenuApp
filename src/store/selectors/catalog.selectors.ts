import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { CatalogItem } from '@/types';
import { catalogApi } from '@/store/api/catalogApi';

const selectLocationId = (state: RootState) =>
  state.location.selectedLocationId;
const selectActiveCategoryId = (state: RootState) =>
  state.catalog.activeCategoryId;
const selectSearchQuery = (state: RootState) => state.catalog.searchQuery;

const selectCatalogData = (state: RootState) => {
  const locationId = selectLocationId(state);
  if (!locationId) return undefined;
  return catalogApi.endpoints.getCatalog.select(locationId)(state).data;
};

export const selectFilteredItems = createSelector(
  selectCatalogData,
  selectActiveCategoryId,
  selectSearchQuery,
  (catalog, categoryId, query) => {
    if (!catalog) return [];

    let items: CatalogItem[] = catalog.items;

    if (categoryId) {
      items = items.filter(i => i.categoryId === categoryId);
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

export const selectCategories = createSelector(selectCatalogData, catalog => {
  if (!catalog) return [];
  return catalog.categories;
});

export const selectItemById = (itemId: string) =>
  createSelector(selectCatalogData, (catalog): CatalogItem | undefined =>
    catalog?.items.find(i => i.id === itemId),
  );
