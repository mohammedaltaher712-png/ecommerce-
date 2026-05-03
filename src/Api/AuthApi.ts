import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DataLogin, DataRegister, Login, Register } from "../Types/Types";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation<Login, DataLogin>({
      query: (user) => ({
        url: `login`,
        method: "POST",
        body: user,
      }),
    }),
    registers: build.mutation<Register, DataRegister>({
      query: (user) => ({
        url: `regsiter`,
        method: "POST",
        body: user,
      }),
    }),
  }),
});
export const { useLoginMutation, useRegistersMutation } = authApi;
