import {createSlice} from '@reduxjs/toolkit';

const myBookingSlice = createSlice({
  name: 'booking',
  initialState: {
    myBookingData: [],
  },
  reducers: {
    changeMyBooking: (state, action) => {
      state.myBookingData = action.payload;
    },
  },
});

export const myBookingReducer = myBookingSlice.reducer;
export const {changeMyBooking} =
  myBookingSlice.actions;

export const myBookingSelector = state => state.myBookingReducer.myBookingData;
