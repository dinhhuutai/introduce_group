import {View, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  SectionComponent,
  SpaceComponent,
} from '../../components';
import Price from './components/Price';
import Rating from './components/Rating';
import Sort from './components/Sort';
import Util from './components/Util';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setFilter} from '../../redux/reducers/searchReducer';

const FilterHotelScreen = () => {
  const [valuePrice, setValuePrice] = useState([20, 10000]);
  const [valueRating, setValueRating] = useState(0);
  const [valueSort, setValueSort] = useState(0);
  const [valueUtil, setValueUtil] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSearch = async () => {
    dispatch(
      setFilter({
        filterPrice: {
          min: valuePrice[0],
          max: valuePrice[1],
        },
        filterRating: valueRating,
        filterSort: valueSort,
        filterUtils: valueUtil,
      }),
    );

    navigation.navigate('SearchScreen');
  };

  return (
    <>
      <ContainerComponent isScroll back title="Filter">
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Price valuePrice={valuePrice} setValuePrice={setValuePrice} />
        <Rating valueRating={valueRating} setValueRating={setValueRating} />
        <Sort valueSort={valueSort} setValueSort={setValueSort} />
        <Util valueUtil={valueUtil} setValueUtil={setValueUtil} />

        <SpaceComponent height={80} />
      </ContainerComponent>
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 16,
          bottom: 0,
          position: 'absolute',
          left: 0,
          right: 0,
        }}>
        <ButtonComponent
          onPress={() => handleSearch()}
          type="primary"
          text="Áp dụng"></ButtonComponent>
      </View>
    </>
  );
};

export default FilterHotelScreen;
