import {
  View,
  Text,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import CardSearchHotel from './components/CardSearchHotel';
import {useDebounce} from '../../hooks';
import hotelAPI from '../../apis/hotelApi';
import {useDispatch, useSelector} from 'react-redux';
import {searchSelector, setName} from '../../redux/reducers/searchReducer';

const SearchNameHotelScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const [datas, setDatas] = useState([]);

  const debounced = useDebounce(value, 500);
  const dispatch = useDispatch();

  const search = useSelector(searchSelector);

  useEffect(() => {
    setValue(search.searchName);
  }, []);

  useEffect(() => {
    if (debounced === '' || debounced === undefined) {
      setDatas([]);
    } else {
      getData();
    }
  }, [debounced]);

  const getData = async () => {
    const res = await hotelAPI.HandleHotel(
      '/searchByName',
      {name: debounced},
      'post',
    );

    setDatas(res.hotels);
  };

  const handleSaveAddress = async () => {
    dispatch(setName(value));
    navigation.goBack();
  };

  return (
    <ContainerComponent back title="Tìm kiếm khách sạn">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SectionComponent>
        <View style={{flex: 1, position: 'relative', marginTop: 10}}>
          <InputComponent
            value={value}
            placeholder="Tìm kiếm tên khách sạn"
            onChange={val => {
              setValue(val);
            }}
            allowClear
            affix={
              <TouchableOpacity onPress={handleSaveAddress}>
                <AntDesign name="search1" size={22} color={appColors.text} />
              </TouchableOpacity>
            }
          />
        </View>
      </SectionComponent>

      <SpaceComponent height={60} />
      {value && (
        <SectionComponent>
          <TouchableOpacity
            onPress={handleSaveAddress}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="search1" size={22} color={appColors.text} />
            <SpaceComponent width={10} />
            <TextComponent text={value} />
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: appColors.gray,
              marginTop: 16,
            }}
          />
        </SectionComponent>
      )}

      <View style={{flex: 1}}>
        <ScrollView>
          <SectionComponent>
            {datas.length > 0 && (
              <TextComponent
                text="Gợi ý"
                size={16}
                color={appColors.text}
                font={fontFamilies.semiBold}
              />
            )}
            <SpaceComponent height={10} />
            {datas?.map(data => (
              <View key={data._id}>
                <CardSearchHotel data={data} />
              </View>
            ))}
          </SectionComponent>
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default SearchNameHotelScreen;
