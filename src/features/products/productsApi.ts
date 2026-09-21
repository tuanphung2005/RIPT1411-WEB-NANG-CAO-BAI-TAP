import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, FetchProductsArgs } from './types';

/**
 * RTK Query API slice cho Products
 * Cung cấp tự động caching, polling, deduplication và quản lý trạng thái loading/error/success
 */
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], FetchProductsArgs | void>({
      query: (args) => {
        if (args?.delayMs) {
          return `products?delay=${args.delayMs}`;
        }
        return 'products';
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
} = productsApi;
