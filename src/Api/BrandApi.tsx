import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BrandType } from "../Types/Types";



export const brandstApi = createApi({
  reducerPath: "brandstApi", // 🔥 صححناه
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  endpoints: (build) => ({
    getBrands: build.query<BrandType[], void>({
      query: () => `brands`,
      transformResponse: (response: { data: BrandType[] }) =>
        response.data,
    }),
  }),
});

export const { useGetBrandsQuery } = brandstApi;