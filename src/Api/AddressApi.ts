import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DataAddress, AddressResponse } from "../Types/Types";

export const addressApi = createApi({
  reducerPath: "addressApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Address"],

  endpoints: (build) => ({
    // ➕ إضافة عنوان
    addAddress: build.mutation<AddressResponse, DataAddress>({
      query: (address) => ({
        url: "/addresses",
        method: "POST",
        body: address,
      }),

      // 🔥 بعد الإضافة يحدث إعادة تحميل تلقائي
      invalidatesTags: ["Address"],
    }),

    // 📥 جلب العناوين
    getMyAddresses: build.query<AddressResponse, void>({
      query: () => ({
        url: "/addresses",
        method: "GET",
      }),

      // 🔥 ربط الكاش
      providesTags: ["Address"],
    }),

    // 🗑 حذف عنوان
    deleteAddress: build.mutation({
      query: (id: number) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),

      // 🔥 تحديث تلقائي بعد الحذف
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetMyAddressesQuery,
  useDeleteAddressMutation,
} = addressApi;
