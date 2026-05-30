import { baseApi } from '@/store/api/baseApi';
import type { CatalogResponse } from '@/types';

export const catalogApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCatalog: builder.query<CatalogResponse, string>({
      query: locationId => ({ url: `/catalog/${locationId}` }),
      providesTags: (_result, _err, locationId) => [
        { type: 'Catalog', id: locationId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCatalogQuery } = catalogApi;
