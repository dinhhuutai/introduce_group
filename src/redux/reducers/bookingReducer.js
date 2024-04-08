import {createSlice} from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookingData: {
      phone: null,
      methodPaymennt: null,
    },
  },
  reducers: {
    addPhone: (state, action) => {
      state.bookingData.phone = action.payload;
    },
    addMethodPaymennt: (state, action) => {
      state.bookingData.methodPaymennt = action.payload;
    },
    removeBooking: (state, action) => {
      state.bookingData = null;
    },
  },
});

export const bookingReducer = bookingSlice.reducer;
export const {addPhone, addMethodPaymennt, removeBooking} =
  bookingSlice.actions;

export const bookingSelector = state => state.bookingReducer.bookingData;
