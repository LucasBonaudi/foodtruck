import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    foodItemsFilter: '',
};


export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
      setFilters: (state, action: PayloadAction<string>) => {
        state.foodItemsFilter = action.payload;
      },
    },
    selectors: {
        getFoodItemsFilter: trucks => trucks.foodItemsFilter
    }
  });
  

  export const { setFilters } = headerSlice.actions;

  export const { getFoodItemsFilter } = headerSlice.selectors