import { baseApi } from '@/store/api/baseApi';
import type { Location } from '@/types';

export const locationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLocations: builder.query<Location[], void>({
      query: () => ({ url: '/locations' }),
      providesTags: ['Locations'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetLocationsQuery } = locationsApi;
