import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AuthNavigator from './AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import MainNavigator from './MainNavigator';

const AppRouters = () => {
  const {getItem} = useAsyncStorage('auth');

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const res = await getItem();

    if (res) {
      dispatch(addAuth(JSON.parse(res)));
    }
  };

  return <>{auth && auth?.accessToken ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppRouters;
