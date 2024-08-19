import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TrucksApiResponse, TrucksApiQuery } from './interfaces'

export const truckmapApiSlice = createApi({
  reducerPath: 'truckmapApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api/' }),
  endpoints: (builder) => ({
    getFoodTrucks: builder.query<TrucksApiResponse[], TrucksApiQuery>({
      query: (query) => {
        const { northEast, southWest } = query.bounds || {};

        let queryStr = `trucks/foodtrucks?fooditem=${query.foodItemfilter}`

        if (northEast && southWest) {
          queryStr += `&ne_lat=${northEast.lat}&ne_lng=${northEast.lng}&sw_lat=${southWest.lat}&sw_lng=${southWest.lng}`;
        }
      
        return queryStr;
      },
    }),
  }),
});

export const { useGetFoodTrucksQuery } = truckmapApiSlice;