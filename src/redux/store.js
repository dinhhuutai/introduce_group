import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {searchReducer} from './reducers/searchReducer';
import {listLikeReducer} from './reducers/listLikeReducer';
import {userReducer} from './reducers/userReducer';
import {bookingReducer} from './reducers/bookingReducer';

const store = configureStore({
  reducer: {
    authReducer,
    searchReducer,
    listLikeReducer,
    userReducer,
    bookingReducer,
  },
});

export default store;
