// truckmapApiSlice.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { truckmapApiSlice } from './truckmapApiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { HttpResponse, http } from 'msw'

export const restHandlers = [
    http.get('https://rest-endpoint.example/path/to/posts', () => {
      return HttpResponse.json(posts)
    }),
  ]

  
beforeEach(() => {
  vi.stubGlobal('fetch', async (input: RequestInfo | URL, init?: RequestInit) => {
    return {
      json: async () => [
        {
            locationid: 1723891,
            applicant: "Brazuca Grill",
            location_description: "ARMSTRONG AVE: HAWES ST to INGALLS ST (1300 - 1399)",
            address: "1315 ARMSTRONG AVE",
            latitude: 37.723078757516,
            longitude: -122.38752570401662,
            foodItems: "Cold Truck: Sandwiches: Noodles:  Pre-packaged Snacks: Candy: Desserts Various Beverages"
        },
        {
            locationid: 364218,
            latitude: 37.78788969990609,
            longitude: -122.40053532677749,
            foodItems: "Hot Indian Chai (Tea)",
            applicant: "The Chai Cart",
            address: "79 NEW MONTGOMERY ST",
            location_description: "NEW MONTGOMERY ST: AMBROSE BIERCE ST to MISSION ST (77 - 99)"
        }
      ],
    } as Response;
  });
});

describe('truckmapApiSlice', () => {
  const store = configureStore({
    reducer: {
      [truckmapApiSlice.reducerPath]: truckmapApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(truckmapApiSlice.middleware),
  });

  setupListeners(store.dispatch);

  it('should fetch and return food trucks data', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () =>
        truckmapApiSlice.endpoints.getFoodTrucks.useQuery({
          foodItemfilter: 'Tacos',
          bounds: null,
        }),
      {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      }
    );

    await waitForNextUpdate();

    // Assert that the data is the mocked data
    expect(result.current.data).toEqual([
      { id: 1, name: 'Truck 1', latitude: 37.7749, longitude: -122.4194 },
      { id: 2, name: 'Truck 2', latitude: 37.7849, longitude: -122.4294 },
    ]);
  });
});
