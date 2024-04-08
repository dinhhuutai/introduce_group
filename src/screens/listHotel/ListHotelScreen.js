import {
  ContainerComponent,
  SectionComponent,
  SpaceComponent,
} from '../../components';
import {FlatList, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Card from '../../components/Card';
import hotelAPI from '../../apis/hotelApi';
import {Text} from 'react-native-svg';

const dataMain = [
  {
    id: 1,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 2,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 3,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 4,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 5,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 6,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 7,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 8,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 9,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 10,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
  {
    id: 11,
    image: require('../../assets/images/hotel-1.png'),
    name: 'Hilton Da Nang',
    price: '$1000',
    address: 'Da Nang, Viet Nam',
    star: '8,8 awesome',
    info: {
      bedroom: 2,
      bathroom: 1,
      guestroom: 1,
    },
  },
];

const ListHotelScreen = ({route}) => {
  const [data, setData] = useState([]);

  const {title, url, idUser} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await hotelAPI.HandleHotel(`/${url}`, {idUser}, 'post');

    setData(res.data);
  };

  return (
    <ContainerComponent back title={title}>
      <SpaceComponent height={20} />
      <SectionComponent>
        {data && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => <Card item={item} />}
            keyExtractor={item => item._id.toString()}
            onEndReached={getData}
            onEndReachedThreshold={0.5}
          />
        )}
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ListHotelScreen;
