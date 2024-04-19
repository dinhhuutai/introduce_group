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
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import bookingAPI from '../../../apis/bookingApi';
import {useDispatch, useSelector} from 'react-redux';
import {myBookingSelector} from '../../../redux/reducers/myBookingReducer';

const MyBookingScreen = () => {
  const {getItem} = useAsyncStorage('auth');
  const [data, setData] = useState([]);
  const [select, setSelect] = useState('active');
  const [isModal, setIsModal] = useState(false);
  const [idBookingCancel, setIdBookingCancel] = useState('');

  const myBooking = useSelector(myBookingSelector);

  useEffect(() => {
    getData();
  }, [select, myBooking]);

  const getData = async () => {
    try {
      const resUser = await getItem();
      const userTemp = JSON.parse(resUser);
      const res = await bookingAPI.HandleBooking(
        `/getByIdUser/${userTemp._id}/${
          select === 'active' ? 1 : select === 'completed' ? 2 : 3
        }`,
      );

      if (res.success) {
        console.log(res.data);
        setData(res.data);
      }
    } catch (error) {}
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
          renderItem={({item}) => (
            <Card
              setIdBookingCancel={setIdBookingCancel}
              item={item}
              setIsModal={setIsModal}
            />
          )}
          keyExtractor={item => item?._id?.toString()}
          onEndReached={getData}
          onEndReachedThreshold={0.5}
        />
      </SectionComponent>

      {isModal && (
        <ModalCancelBooking
          idBookingCancel={idBookingCancel}
          setIsModal={setIsModal}
          setSelect={setSelect}
        />
      )}
    </ContainerComponent>
  );
};

export default MyBookingScreen;
