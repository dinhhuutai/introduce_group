import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {FlatList, StatusBar, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Card from '../../../components/Card';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import hotelAPI from '../../../apis/hotelApi';
import pageAPI from '../../../apis/pageApi';


const HistoryScreen = () => {
  const [data, setData] = useState([]);

  const {getItem} = useAsyncStorage('auth');


  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    const resUser = await getItem();
    const userTemp = JSON.parse(resUser);

    
    const res = await pageAPI.HandlePage(
      `/history/${userTemp._id}`,
    );


    setData(res.data);
  };

  return (
    <ContainerComponent>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SpaceComponent height={40} />
      <RowComponent justify="center">
        <TextComponent text="Booking history" title />
      </RowComponent>

      <SpaceComponent height={20} />
      <SectionComponent styles={{marginBottom: 160}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={item => item._id.toString()}
          onEndReached={getData}
          onEndReachedThreshold={0.5}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default HistoryScreen;
