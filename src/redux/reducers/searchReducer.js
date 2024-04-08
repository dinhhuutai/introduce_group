import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchDate: {
      startDate: {
        d: '',
        m: '',
        y: '',
      },
      endDate: {
        d: '',
        m: '',
        y: '',
      },
    },
    searchAddress: {
      province: {
        name: '',
        _id: '',
      },
      district: {
        name: '',
        _id: '',
      },
      commune: {
        name: '',
        _id: '',
      },
    },
    searchQuantityPerson: {
      adult: 0,
      kid: 0,
    },
    searchName: '',
    filterPrice: {
      min: 20,
      max: 10000,
    },
    filterRating: 0,
    filterSort: 0,
    filterUtils: [],
  },
  reducers: {
    setDate: (state, action) => {
      state.searchDate = action.payload;
    },
    setAddress: (state, action) => {
      state.searchAddress = action.payload;
    },
    setQuantityPerson: (state, action) => {
      state.searchQuantityPerson = action.payload;
    },
    setName: (state, action) => {
      state.searchName = action.payload;
    },
    setFilter: (state, action) => {
      state.filterPrice = action.payload.filterPrice;
      state.filterRating = action.payload.filterRating;
      state.filterSort = action.payload.filterSort;
      state.filterUtils = action.payload.filterUtils;
    },
  },
});

export const searchReducer = searchSlice.reducer;
export const {setDate, setAddress, setQuantityPerson, setName, setFilter} =
  searchSlice.actions;

export const searchSelector = state => state.searchReducer;
