import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { OrderType } from "../Types/Types";

export type MyOrdersFilters = {
  status?: string;
  from_date?: string;
  to_date?: string;
};

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        console.log("🔥 RTK SEND DATA:", data);

        return {
          url: "/orders",
          method: "POST",
          body: data,
        };
      },
    }),
    createPaymentIntent: builder.mutation({
      query: (orderId: number) => ({
        url: "/payment-intent",
        method: "POST",
        body: { order_id: orderId },
      }),
    }),

    getOrder: builder.query({
      query: (id: number) => `/orders/${id}`,
    }),

    getMyOrders: builder.query<OrderType[], MyOrdersFilters>({
      query: (params) => ({
        url: "/my-orders",
        params,
      }),
      transformResponse: (response: { data: OrderType[] }) => response.data,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
  useGetOrderQuery,
  useGetMyOrdersQuery,
} = orderApi;
