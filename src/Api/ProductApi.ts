import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductType } from "../Types/Types";

export const productApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  endpoints: (build) => ({
    getProduct: build.query<ProductType[], { search?: string; page?: number }>({
      query: ({ search = "", page = 1 }) =>
        `products?page=${page}&search=${search}`,

      transformResponse: (response: { data: ProductType[] }) => response.data,
    }),
    getProductById: build.query<ProductType, number>({
      query: (id) => `products/${id}`,
      transformResponse: (response: { data: ProductType }) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductQuery, useGetProductByIdQuery } = productApi;
