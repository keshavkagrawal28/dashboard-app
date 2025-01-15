// Currently not in use, data is stored in the frontend

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Products', 'Customers', 'Transactions', 'Sales'],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: () => 'client/products',
      providesTags: ['Products'],
    }),
    getCustomers: build.query({
      query: () => 'client/customers',
      providesTags: ['Customers'],
    }),
    getTransactions: build.query({
      query: ({ page, pagesize, sort, search }) => ({
        url: 'client/transactions',
        method: 'GET',
        params: { page, pagesize, sort, search },
      }),
      providesTags: ['Transactions'],
    }),
    getSales: build.query({
      query: () => 'sales/sales',
      providesTags: ['Sales'],
    }),
    getAdmins: build.query({
      query: () => 'management/admins',
      providesTags: ['Sales'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
} = api;
