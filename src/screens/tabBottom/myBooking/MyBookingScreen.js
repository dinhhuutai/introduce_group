import {
  View,
  Text,
  StatusBar,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import Card from './components/Card';
import {appColors} from '../../../constants/appColors';
import ModalCancelBooking from './components/ModalCancelBooking';

const dataRes = [
  {
    _id: 1,
    idHotel: {
      _id: 1,
      image: require('../../../assets/images/hotel-1.png'),
      name: 'The pearls',
      province: {
        name: 'Tp.Hồ Chí Minh',
      },
      district: {
        name: 'Quận 1',
      },
    },
    idRoom: {
      price: 500,
    },
    status: 1,
  },
  {
    _id: 2,
    idHotel: {
      _id: 1,
      image: require('../../../assets/images/hotel-1.png'),
      name: 'The pearls 2',
      province: {
        name: 'Tp.Hồ Chí Minh',
      },
      district: {
        name: 'Quận 2',
      },
    },
    idRoom: {
      price: 750,
    },
    status: 2,
  },
  {
    _id: 3,
    idHotel: {
      _id: 1,
      image: require('../../../assets/images/hotel-1.png'),
      name: 'The pearls 3',
      province: {
        name: 'Tp.Hồ Chí Minh',
      },
      district: {
        name: 'Quận 3',
      },
    },
    idRoom: {
      price: 700,
    },
    status: 3,
  },
  {
    _id: 4,
    idHotel: {
      _id: 1,
      image: require('../../../assets/images/hotel-1.png'),
      name: 'The pearls 3',
      province: {
        name: 'Tp.Hồ Chí Minh',
      },
      district: {
        name: 'Quận 3',
      },
    },
    idRoom: {
      price: 700,
    },
    status: 1,
  },
  {
    _id: 5,
    idHotel: {
      _id: 1,
      image: require('../../../assets/images/hotel-1.png'),
      name: 'The pearls 3',
      province: {
        name: 'Tp.Hồ Chí Minh',
      },
      district: {
        name: 'Quận 3',
      },
    },
    idRoom: {
      price: 700,
    },
    status: 3,
  },
];

const MyBookingScreen = () => {
  const [data, setData] = useState([]);
  const [select, setSelect] = useState('active');
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    getData();
  }, [select]);

  const getData = async () => {
    let dataTemp;
    if (select === 'active') {
      dataTemp = dataRes.filter(d => d.status === 1);
    } else if (select === 'completed') {
      dataTemp = dataRes.filter(d => d.status === 2);
    } else if (select === 'canceled') {
      dataTemp = dataRes.filter(d => d.status === 3);
    }
    setData(dataTemp);
  };

  return (
    <ContainerComponent>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SpaceComponent height={40} />
      <RowComponent justify="center">
        <TextComponent text="My booking" title />
      </RowComponent>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          marginTop: 30,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => setSelect('active')}
          style={{
            minWidth: 110,
            borderWidth: 1,
            borderColor: appColors.primary1,
            paddingVertical: 4,
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor:
              select === 'active' ? appColors.primary1 : 'transparent',
          }}>
          <Text
            style={{
              color: select === 'active' ? appColors.white : appColors.primary1,
            }}>
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelect('completed')}
          style={{
            minWidth: 110,
            borderWidth: 1,
            borderColor: appColors.primary1,
            paddingVertical: 4,
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor:
              select === 'completed' ? appColors.primary1 : 'transparent',
          }}>
          <Text
            style={{
              color:
                select === 'completed' ? appColors.white : appColors.primary1,
            }}>
            Completed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelect('canceled')}
          style={{
            minWidth: 110,
            borderWidth: 1,
            borderColor: appColors.primary1,
            paddingVertical: 4,
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor:
              select === 'canceled' ? appColors.primary1 : 'transparent',
          }}>
          <Text
            style={{
              color:
                select === 'canceled' ? appColors.white : appColors.primary1,
            }}>
            Canceled
          </Text>
        </TouchableOpacity>
      </View>

      <SpaceComponent height={10} />
      <SectionComponent styles={{marginBottom: 218}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => <Card item={item} setIsModal={setIsModal} />}
          keyExtractor={item => item?._id?.toString()}
          onEndReached={getData}
          onEndReachedThreshold={0.5}
        />
      </SectionComponent>

      {isModal && <ModalCancelBooking setIsModal={setIsModal} />}
    </ContainerComponent>
  );
};

export default MyBookingScreen;
