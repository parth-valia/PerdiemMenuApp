import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Location } from '@/types';

interface LocationState {
  selectedLocationId: string | null;
  selectedLocation: Location | null;
}

const initialState: LocationState = {
  selectedLocationId: null,
  selectedLocation: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocationId = action.payload.id;
      state.selectedLocation = action.payload;
    },
    clearSelectedLocation: state => {
      state.selectedLocationId = null;
      state.selectedLocation = null;
    },
  },
});

export const { setSelectedLocation, clearSelectedLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
