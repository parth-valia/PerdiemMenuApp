import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CatalogState {
  activeCategoryId: string | null;
  searchQuery: string;
}

const initialState: CatalogState = {
  activeCategoryId: null,
  searchQuery: '',
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string | null>) => {
      state.activeCategoryId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      // Reset category filter when searching — results should span all categories
      if (action.payload.length > 0) {
        state.activeCategoryId = null;
      }
    },
    clearSearch: state => {
      state.searchQuery = '';
    },
  },
});

export const { setActiveCategory, setSearchQuery, clearSearch } =
  catalogSlice.actions;
export default catalogSlice.reducer;
