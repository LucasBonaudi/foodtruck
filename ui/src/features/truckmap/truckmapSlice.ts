import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { TrucksApiResponse, TrucksState } from './interfaces'

const initialState: TrucksState = {
    selectedTruck: null,
    userLocation: null,
    locationError: null,
};

export const fetchUserLocation = createAsyncThunk(
    'trucks/fetchUserLocation',
    async (_, { rejectWithValue }) => {
        return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                reject(rejectWithValue('Failed to get user location'));
            }
            );
        } else {
            reject(rejectWithValue('Geolocation is not supported by this browser'));
        }
        });
    }
);

export const truckSlice = createSlice({
    name: 'trucks',
    initialState,
    reducers: {
      setSelectedTruck: (state, action: PayloadAction<TrucksApiResponse | null>) => {
        state.selectedTruck = action.payload;
      },
    },
    selectors: {
        selectedTruck: trucks => trucks.selectedTruck,
        userLocation: trucks => trucks.userLocation,
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserLocation.fulfilled, (state, action) => {
            state.userLocation = action.payload;
            state.locationError = null;
          })
          .addCase(fetchUserLocation.rejected, (state, action) => {
            state.locationError = action.payload as string;
          });
      },
  });
  

  export const { setSelectedTruck } = truckSlice.actions;

  export const { selectedTruck, userLocation } = truckSlice.selectors