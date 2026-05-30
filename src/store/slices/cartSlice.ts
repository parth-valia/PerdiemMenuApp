import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, SelectedModifier, Money } from '@/types';

interface CartState {
  items: CartItem[];
  locationId: string | null; // Cart is location-scoped — adding from a new location clears it
}

const initialState: CartState = {
  items: [],
  locationId: null,
};

interface AddItemPayload {
  itemId: string;
  variationId: string;
  name: string;
  variationName: string;
  price: Money;
  imageUrl?: string;
  selectedModifiers: SelectedModifier[];
  locationId: string;
}

function generateLineItemId(
  variationId: string,
  modifiers: SelectedModifier[],
): string {
  const modifierKey = modifiers
    .map(m => m.modifierId)
    .sort()
    .join('-');
  return `${variationId}:${modifierKey}`;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const { locationId, ...itemData } = action.payload;

      // If adding from a different location, clear the cart first.
      // This matches real food-ordering app behavior and prevents mixed-location orders.
      if (state.locationId && state.locationId !== locationId) {
        state.items = [];
      }
      state.locationId = locationId;

      const lineItemId = generateLineItemId(
        itemData.variationId,
        itemData.selectedModifiers,
      );
      const existing = state.items.find(i => i.id === lineItemId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...itemData, id: lineItemId, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (!item) return;
      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      } else {
        item.quantity = action.payload.quantity;
      }
    },

    clearCart: state => {
      state.items = [];
      state.locationId = null;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
