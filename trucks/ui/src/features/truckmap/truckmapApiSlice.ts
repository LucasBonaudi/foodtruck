import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TrucksApiResponse {
  locationid: number;
  latitude: number;
  longitude: number;
  applicant: string;
  address: string;
  location_description: string;
  foodItems: string;
}

export const truckmapApiSlice = createApi({
  reducerPath: 'truckmapApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getFoodTrucks: builder.query<TrucksApiResponse[], void>({
      query: () => 'trucks/api/foodtrucks/',
    }),
  }),
});

export const { useGetFoodTrucksQuery } = truckmapApiSlice;