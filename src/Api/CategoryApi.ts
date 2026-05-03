import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CategoryBySlugResponse, CategoryType, ProductType } from "../Types/Types";


export const CategoryApi = createApi({
  reducerPath: "CategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["Category"],

  endpoints: (build) => ({
    // =========================
    // Get All Categories
    // =========================
    getCategory: build.query<CategoryType[], void>({
      query: () => "categories",
      transformResponse: (response: { data: CategoryType[] }) => response.data,
      providesTags: ["Category"],
      keepUnusedDataFor: 86400,
    }),

    // =========================
    // Get Category By Slug
    // =========================
    getCategoryBySlug: build.query<
      CategoryBySlugResponse,
      {
        slug: string;
        price?: number;
        condition?: string;
        brand?: string;
        rating?: number;
        coupon?: string;
        page?: number;
      }
    >({
      query: ({ slug, ...params }) => ({
        url: `categories/${slug}`,
        params,
      }),
    }),

    // =========================
    // Get Category By ID
    // =========================
    getCategoryById: build.query<
      {
        data: CategoryType;
        products: ProductType[];
      },
      number
    >({
      query: (id) => `categories/${id}`,
    }),
  }),
});

// =========================
// Hooks
// =========================
export const {
  useGetCategoryQuery,
  useGetCategoryBySlugQuery,
  useGetCategoryByIdQuery,
} = CategoryApi;
