import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { apiClient } from '@/api/client';
import type { ApiSuccessResponse } from '@/types';

// Custom axios base query — gives us full axios features (interceptors, timeout)
// instead of the default fetch-based baseQuery
const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      params?: Record<string, string>;
    },
    unknown,
    { message: string; status?: number }
  > =>
  async ({ url, method = 'GET', params }) => {
    try {
      const response = await apiClient.request<ApiSuccessResponse<unknown>>({
        url,
        method,
        params,
      });
      return { data: response.data.data };
    } catch (err) {
      const axiosError = err as AxiosError<{ error: { message: string } }>;
      return {
        error: {
          status: axiosError.response?.status,
          message:
            axiosError.response?.data?.error?.message ??
            axiosError.message ??
            'Unknown error',
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Locations', 'Catalog'],
  endpoints: () => ({}),
});
