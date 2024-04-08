import {View, Text, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import Top from './components/Top';
import {appColors} from '../../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontFamilies} from '../../constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';
import Card from '../../components/Card';
import {useSelector} from 'react-redux';
import {searchSelector} from '../../redux/reducers/searchReducer';
import hotelAPI from '../../apis/hotelApi';

const SearchScreen = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();
  const search = useSelector(searchSelector);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    getData();
  }, [search]);

  const getData = async () => {
    const dataSearch = {
      address: {
        province: search.searchAddress.province._id,
        district: search.searchAddress.district._id,
        communes: search.searchAddress.commune._id,
      },
      date: {
        checkIn: search.searchDate.startDate.y
          ? new Date(
              search.searchDate.startDate.y,
              search.searchDate.startDate.m - 1,
              search.searchDate.startDate.d,
              14,
              0,
              0,
            )
          : '',
        checkOut: search.searchDate.endDate.y
          ? new Date(
              search.searchDate.endDate.y,
              search.searchDate.endDate.m - 1,
              search.searchDate.endDate.d,
              12,
              0,
              0,
            )
          : '',
      },
      name: search.searchName,
      quantityPeople: {
        adult: search.searchQuantityPerson.adult,
        kid: search.searchQuantityPerson.kid,
      },
      price: {
        min: search.filterPrice.min,
        max: search.filterPrice.max,
      },
      rating: search.filterRating,
      utils: search.filterUtils,
      numSort: search.filterSort,
      limit: 10 * page,
    };

    const res = await hotelAPI.HandleHotel('/search', dataSearch, 'post');

    setData(res.data);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <ContainerComponent back title="Search">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Top />

      <SectionComponent>
        <RowComponent justify="space-between" styles={{paddingHorizontal: 16}}>
          <TextComponent
            text="Search results"
            font={fontFamilies.semiBold}
            size={16}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('FilterHotelScreen')}>
            <AntDesign name="filter" size={18} color={appColors.text} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>

      <View style={{flex: 1, paddingHorizontal: 16}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={item => item._id.toString()}
          onEndReached={getData}
          onEndReachedThreshold={0.5}
        />
      </View>
    </ContainerComponent>
  );
};

export default SearchScreen;
