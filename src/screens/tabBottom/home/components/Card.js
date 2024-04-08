import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {appColors} from '../../../../constants/appColors';
import {
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../../../components';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import userAPI from '../../../../apis/userApi';
import {useDispatch, useSelector} from 'react-redux';
import {
  listLikeSelector,
  putListLike,
} from '../../../../redux/reducers/listLikeReducer';

const Card = ({data}) => {
  const {getItem} = useAsyncStorage('auth');
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const listLike = useSelector(listLikeSelector);

  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getItem();

    if (res) {
      setUser(JSON.parse(res));
    }
  };

  const hanldeLike = async favou => {
    const res = await userAPI.HandleUser(
      '/likeHotel',
      {idUser: user._id, idHotel: data._id, statusLike: favou},
      'put',
    );

    dispatch(putListLike(res.data));
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailHotelScreen', {id: data._id})
        }>
        <Image
          style={{width: 150, height: 90, borderRadius: 10}}
          source={
            require('../../../../assets/images/hotel.png') ||
            require('../../../../assets/images/logo.png')
          }
        />
      </TouchableOpacity>
      <SpaceComponent height={10} />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontSize: 14,
          fontFamily: fontFamilies.semiBold,
          color: appColors.text,
          width: 150,
        }}>
        {data?.name}
      </Text>
      <SpaceComponent height={10} />
      <RowComponent justify="space-between">
        <RowComponent>
          <Octicons name="location" size={14} color={appColors.text1} />
          <SpaceComponent width={4} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 10,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
              width: 100,
            }}>
            {`${data?.district?.name}, ${data?.province?.name}`}
          </Text>
        </RowComponent>
        <TouchableOpacity
          onPress={() => hanldeLike(!listLike.includes(data._id))}>
          <Octicons
            name="heart-fill"
            size={18}
            color={
              listLike.includes(data._id) ? appColors.red : appColors.text1
            }
          />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default Card;
