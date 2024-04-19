import {createSlice} from '@reduxjs/toolkit';

const NotificationSlice = createSlice({
  name: 'booking',
  initialState: {
    notificationData: 0,
  },
  reducers: {
    changeNotification: (state, action) => {
      state.notificationData = action.payload;
    },
  },
});

export const notificationReducer = NotificationSlice.reducer;
export const {changeNotification} = NotificationSlice.actions;

export const notificationSelector = state =>
  state.notificationReducer.notificationData;
