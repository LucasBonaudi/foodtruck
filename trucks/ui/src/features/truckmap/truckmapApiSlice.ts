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

export interface LatLngBounds {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
}

export interface TrucksApiQuery {
  foodItemfilter: string;
  bounds: LatLngBounds;
}

export const truckmapApiSlice = createApi({
  reducerPath: 'truckmapApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getFoodTrucks: builder.query<TrucksApiResponse[], TrucksApiQuery>({
      query: (query) => {
        const { northEast, southWest } = query.bounds || {};

        let queryStr = `trucks/api/foodtrucks?fooditem=${query.foodItemfilter}`

        if (northEast && southWest) {
          queryStr += `&ne_lat=${northEast.lat}&ne_lng=${northEast.lng}&sw_lat=${southWest.lat}&sw_lng=${southWest.lng}`;
        }
      
        return queryStr;
      },
    }),
  }),
});

export const { useGetFoodTrucksQuery } = truckmapApiSlice;