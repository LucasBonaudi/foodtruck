import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrucksApiResponse } from './truckmapApiSlice';


interface TrucksState {
    selectedTruck: TrucksApiResponse | null;
  }
  
const initialState: TrucksState = {
    selectedTruck: null
};


export const truckSlice = createSlice({
    name: 'trucks',
    initialState,
    reducers: {
      setSelectedTruck: (state, action: PayloadAction<TrucksApiResponse | null>) => {
        state.selectedTruck = action.payload;
      },
    },
    selectors: {
        selectedTruck: trucks => trucks.selectedTruck
    }
  });
  

  export const { setSelectedTruck } = truckSlice.actions;

  export const { selectedTruck } = truckSlice.selectors