import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/store/api/baseApi';
import locationReducer from '@/store/slices/locationSlice';
import catalogReducer from '@/store/slices/catalogSlice';
import cartReducer from '@/store/slices/cartSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    location: locationReducer,
    catalog: catalogReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // RTK uses immer internally — serializability check would flag its proxies.
      // We disable it only for the API slice, not the whole store.
      serializableCheck: {
        ignoredActions: [baseApi.reducerPath],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
