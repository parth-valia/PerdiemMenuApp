// Client-side types mirroring our API contract.
// These are intentionally separate from the backend types — we don't share
// code between client and server to avoid coupling their release cycles.

export interface Location {
  id: string;
  name: string;
  address: string;
  timezone: string;
  status: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Money {
  amount: number;
  currency: string;
  formatted: string;
}

export interface Modifier {
  id: string;
  name: string;
  price?: Money;
}

export interface ModifierList {
  id: string;
  name: string;
  selectionType: 'SINGLE' | 'MULTIPLE';
  modifiers: Modifier[];
}

export interface ItemVariation {
  id: string;
  name: string;
  price: Money;
  inStock?: boolean;
  quantity?: number;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  imageUrl?: string;
  variations: ItemVariation[];
  modifierLists: ModifierList[];
  availableNow: boolean;
  availabilityReason?: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  availableNow: boolean;
}

export interface CatalogResponse {
  categories: Category[];
  items: CatalogItem[];
  locationId: string;
  computedAt: string;
}

// Cart
export interface CartItem {
  id: string; // unique line-item id
  itemId: string;
  variationId: string;
  name: string;
  variationName: string;
  price: Money;
  quantity: number;
  imageUrl?: string;
  selectedModifiers: SelectedModifier[];
}

export interface SelectedModifier {
  modifierListId: string;
  modifierId: string;
  name: string;
  price?: Money;
}

// API response envelope
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
