import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {ContainerComponent, SpaceComponent} from '../../../components';
import Top from './components/Top';
import Item from './components/Item';
import pageAPI from '../../../apis/pageApi';
import {useDispatch, useSelector} from 'react-redux';
import {
  listLikeSelector,
  putListLike,
} from '../../../redux/reducers/listLikeReducer';
import userAPI from '../../../apis/userApi';
import {addUser} from '../../../redux/reducers/userReducer';
import { addPhone } from '../../../redux/reducers/bookingReducer';

const HomeScreen = () => {
  const {getItem} = useAsyncStorage('auth');
  const [user, setUser] = useState();
  const [data, setDate] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resUser = await getItem();
    const userTemp = JSON.parse(resUser);

    if (resUser) {
      setUser(userTemp);
      dispatch(addPhone(userTemp.phone))
    }

    const resListLike = await userAPI.HandleUser(
      `/getListLike/${userTemp._id}`,
    );

    if (resListLike.success) {
      dispatch(putListLike(resListLike.data));
    }

    const res = await pageAPI.HandlePage(
      `/home`,
      {idUser: userTemp._id},
      'post',
    );

    setDate(res.data);

    const resUs = await userAPI.HandleUser(`/getById/${userTemp._id}`);
    dispatch(addUser(resUs.data));
  };

  console.log(user);

  return (
    <ContainerComponent isScroll>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <Top user={user} />
      {data?.nearHotels.length > 0 && (
        <Item
          idUser={user._id}
          url="getHistoryBookingByUser"
          title="Around you"
          data={data.nearHotels}
        />
      )}
      {data?.outstandingHotels.length > 0 && (
        <Item
          idUser={user._id}
          url="getOutstandingHotel"
          title="Outstanding"
          data={data.outstandingHotels}
        />
      )}
      {data?.newHotels.length > 0 && (
        <Item
          idUser={user._id}
          url="getNewHotel"
          title="New Hotels"
          data={data.newHotels}
        />
      )}
      {data?.bookedHotels.length > 0 && (
        <Item
          idUser={user._id}
          url="getHistoryBookingByUser"
          title="Booked hotels"
          data={data.bookedHotels}
        />
      )}
      <SpaceComponent height={120} />
    </ContainerComponent>
  );
};

export default HomeScreen;
