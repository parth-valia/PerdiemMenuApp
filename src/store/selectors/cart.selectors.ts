import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemCount = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

// Subtotal in cents — keep as integer until display to avoid floating point drift
export const selectCartSubtotalCents = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => {
    const modifierTotal = item.selectedModifiers.reduce(
      (ms, mod) => ms + (mod.price?.amount ?? 0),
      0,
    );
    return sum + (item.price.amount + modifierTotal) * item.quantity;
  }, 0),
);

export const selectCartSubtotalFormatted = createSelector(
  selectCartSubtotalCents,
  cents => {
    const currency = 'USD'; // In a real app, get this from the first item
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(cents / 100);
  },
);

export const selectCartLocationId = (state: RootState) => state.cart.locationId;
