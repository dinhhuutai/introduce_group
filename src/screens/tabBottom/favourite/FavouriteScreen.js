import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Card from '../../../components/Card';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import pageAPI from '../../../apis/pageApi';
import notFavou from '../../../assets/images/notFavourite.png';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {useDispatch, useSelector} from 'react-redux';
import {listLikeSelector} from '../../../redux/reducers/listLikeReducer';

const FavouriteScreen = () => {
  const [data, setData] = useState([]);
  const listLike = useSelector(listLikeSelector);

  const {getItem} = useAsyncStorage('auth');

  useEffect(() => {
    getData();
  }, [listLike]);

  const getData = async () => {
    const resUser = await getItem();
    const userTemp = JSON.parse(resUser);

    const res = await pageAPI.HandlePage(`/favourite/${userTemp._id}`);

    setData(res.data);
  };

  return (
    <ContainerComponent>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SpaceComponent height={40} />
      <RowComponent justify="center">
        <TextComponent text="My favourite hotel" title />
      </RowComponent>

      <SpaceComponent height={20} />
      {data.length === 0 ? (
        <View style={{marginTop: 100, alignItems: 'center'}}>
          <Image style={{width: 200, height: 200}} source={notFavou} />
          <Text
            style={{
              fontSize: 16,
              color: appColors.text1,
              fontFamily: fontFamilies.semiBold,
            }}>
            No Hotel Favourite
          </Text>
        </View>
      ) : (
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
      )}
    </ContainerComponent>
  );
};

export default FavouriteScreen;
