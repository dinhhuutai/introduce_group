import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {searchReducer} from './reducers/searchReducer';
import {listLikeReducer} from './reducers/listLikeReducer';
import {userReducer} from './reducers/userReducer';
import {bookingReducer} from './reducers/bookingReducer';
import {myBookingReducer} from './reducers/myBookingReducer';
import {notificationReducer} from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    authReducer,
    searchReducer,
    listLikeReducer,
    userReducer,
    bookingReducer,
    myBookingReducer,
    notificationReducer,
  },
});

export default store;
