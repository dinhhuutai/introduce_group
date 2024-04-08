import {createSlice} from '@reduxjs/toolkit';

const listLikeSlice = createSlice({
  name: 'listLike',
  initialState: {
    listLikeData: [],
  },
  reducers: {
    putListLike: (state, action) => {
      state.listLikeData = action.payload;
    },
  },
});

export const listLikeReducer = listLikeSlice.reducer;
export const {putListLike} = listLikeSlice.actions;

export const listLikeSelector = state => state.listLikeReducer.listLikeData;
