import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import {fontFamilies} from '../../constants/fontFamilies';
import Card from './components/Card';
import {useRoute} from '@react-navigation/native';
import roomAPI from '../../apis/roomApi';
import {useDispatch, useSelector} from 'react-redux';
import {
  searchSelector,
  setDate,
  setQuantityPerson,
} from '../../redux/reducers/searchReducer';
import distanceTwoDay from '../../utils/distanceTwoDay';

const ListRoomScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const route = useRoute();
  const {idHotel} = route.params;

  const search = useSelector(searchSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!search.searchDate.startDate.y) {
      const newDate = new Date();
      const dateNow = {
        d: newDate.getDate(),
        m: newDate.getMonth() + 1,
        y: newDate.getFullYear(),
      };

      const newDateTomorrow = new Date(dateNow.y, dateNow.m - 1, dateNow.d + 1);
      const dateTomorrow = {
        d: newDateTomorrow.getDate(),
        m: newDateTomorrow.getMonth() + 1,
        y: newDateTomorrow.getFullYear(),
      };

      const date = {
        startDate: dateNow,
        endDate: dateTomorrow,
      };

      dispatch(setDate(date));
    }

    if (
      !search.searchQuantityPerson.adult &&
      !search.searchQuantityPerson.kid
    ) {
      dispatch(
        setQuantityPerson({
          adult: 2,
          kid: 0,
        }),
      );
    }
  }, []);


  useEffect(() => {
    setPage(0);
    getData();
  }, [search]);

  const getData = async () => {
    const dataSearch = {
      idHotel,
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
      quantityPeople: {
        adult: search.searchQuantityPerson.adult,
        kid: search.searchQuantityPerson.kid,
      },
      limit: 10 * page,
    };

    const res = await roomAPI.HandleRoom(
      '/getByDateAndQuantityPeople',
      dataSearch,
      'post',
    );

    setData(res.data);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <ContainerComponent back title="List room">
      <SpaceComponent height={10} />
      <SectionComponent>
        <View
          style={{
            borderWidth: 1,
            borderColor: appColors.gray,
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 8,
          }}>
          <RowComponent justify="space-between">
            <TextComponent
              text={`${distanceTwoDay(
                search?.searchDate?.startDate.d,
                search?.searchDate?.startDate.m,
                search?.searchDate?.startDate.y,
                search?.searchDate?.endDate.d,
                search?.searchDate?.endDate.m,
                search?.searchDate?.endDate.y,
              )} Night`}
              font={fontFamilies.semiBold}
              color={appColors.text}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectDateScreen')}>
              <TextComponent text="Thay đổi" color={appColors.primary} />
            </TouchableOpacity>
          </RowComponent>

          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: appColors.gray,
              marginVertical: 12,
            }}></View>

          <RowComponent justify="space-between">
            <View>
              <TextComponent text="Check in" font={fontFamilies.semiBold} />
              <SpaceComponent height={4} />
              <TextComponent
                text={`${
                  search?.searchDate?.startDate.d < 10
                    ? '0' + search?.searchDate?.startDate.d
                    : search?.searchDate?.startDate.d
                }/${
                  search?.searchDate?.startDate.m < 10
                    ? '0' + search?.searchDate?.startDate.m
                    : search?.searchDate?.startDate.m
                }/${search?.searchDate?.startDate.y}`}
                size={16}
                font={fontFamilies.semiBold}
              />
            </View>

            <Octicons name="arrow-right" size={22} color={appColors.text} />

            <View>
              <TextComponent text="Check out" font={fontFamilies.semiBold} />
              <SpaceComponent height={4} />
              <TextComponent
                text={`${
                  search?.searchDate?.endDate.d < 10
                    ? '0' + search?.searchDate?.endDate.d
                    : search?.searchDate?.endDate.d
                }/${
                  search?.searchDate?.endDate.m < 10
                    ? '0' + search?.searchDate?.endDate.m
                    : c.searchDate?.endDate.m
                }/${search?.searchDate?.endDate.y}`}
                size={16}
                font={fontFamilies.semiBold}
              />
            </View>
          </RowComponent>
        </View>

        <SpaceComponent height={10} />

        <View
          style={{
            borderWidth: 1,
            borderColor: appColors.gray,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}>
          <RowComponent justify="space-between">
            <RowComponent>
              <Octicons name="person" size={20} color={appColors.text} />
              <SpaceComponent width={30} />

              <TextComponent
                text={`${search?.searchQuantityPerson?.adult} adult - ${search?.searchQuantityPerson?.kid} kid`}
                font={fontFamilies.semiBold}
                size={16}
                color={appColors.text}
              />
            </RowComponent>

            <TouchableOpacity
              onPress={() => navigation.navigate('SelectRoomTypeScreen')}>
              <TextComponent text="Thay đổi" color={appColors.primary} />
            </TouchableOpacity>
          </RowComponent>
        </View>
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

export default ListRoomScreen;
