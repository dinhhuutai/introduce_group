import {View, Text, Image, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {appInfo} from '../../constants/appInfos';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ArrowLeft} from 'iconsax-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from 'axios';
import hotelAPI from '../../apis/hotelApi';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  listLikeSelector,
  putListLike,
} from '../../redux/reducers/listLikeReducer';
import userAPI from '../../apis/userApi';

const DetailHotelScreen = () => {
  const [isLike, setIsLike] = useState(false);
  const [dataHotel, setDataHotel] = useState();
  const [dataComment, setDataComment] = useState([]);
  const [lengthComment, setLengthComment] = useState();

  const [scrollPosition, setScrollPosition] = useState(0);

  const navigation = useNavigation();

  const route = useRoute();
  const {id} = route.params;

  const {getItem} = useAsyncStorage('auth');
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const listLike = useSelector(listLikeSelector);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resUser = await getItem();

    if (resUser) {
      setUser(JSON.parse(resUser));
    }

    const res = await hotelAPI.HandleHotel(`/getById/${id}`);

    setDataHotel(res.data.hotel);
    setLengthComment(res.data.commentLength);
    setDataComment(res.data.topTwoComments);
  };

  const hanldeLike = async favou => {
    const res = await userAPI.HandleUser(
      '/likeHotel',
      {idUser: user._id, idHotel: dataHotel._id, statusLike: favou},
      'put',
    );

    dispatch(putListLike(res.data));
  };

  // async function getCoordinates(address) {
  //   try {
  //     const response = await axios.get(
  //       'https://maps.googleapis.com/maps/api/geocode/json',
  //       {
  //         params: {
  //           address: address,
  //           key: 'AIzaSyA3xG3Xr1cXyGy12ir-N6BvCcH5oL1AhZY', // Thay YOUR_GOOGLE_MAPS_API_KEY bằng API key của bạn
  //         },
  //       },
  //     );
  //     const location = response?.data?.results[0]?.geometry?.location;
  //     console.log('Latitude:', location?.lat);
  //     console.log('Longitude:', location?.lng);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  // // Sử dụng hàm để lấy tọa độ từ một địa chỉ cụ thể
  // getCoordinates(
  //   '01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
  // );

  return (
    <View style={{flex: 1}}>
      <ContainerComponent
        onScrollPosition={val => setScrollPosition(val)}
        isScroll
        title={scrollPosition >= 84 ? `${dataHotel?.name}` : false}
        back={scrollPosition >= 84 ? true : false}
        styles={{
          flex: 1,
        }}>
        {scrollPosition < 84 && (
          <View
            style={{
              position: 'absolute',
              top: 30,
              right: 0,
              left: 20,
              flex: 1,
              zIndex: 999,
            }}>
            <GestureHandlerRootView style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginRight: 12,
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: appColors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ArrowLeft size={24} color={appColors.text} />
              </TouchableOpacity>
            </GestureHandlerRootView>
          </View>
        )}

        <GestureHandlerRootView>
          <TouchableOpacity onPress={() => navigation.navigate('FitureScreen')}>
            <Image
              style={[
                {
                  width: '100%',
                  height: 340,
                  objectFit: 'cover',
                },
              ]}
              source={require('../../assets/images/detail-1.png')}
            />
          </TouchableOpacity>
        </GestureHandlerRootView>
        <SectionComponent>
          <SpaceComponent height={20} />
          <RowComponent justify="space-between">
            <TextComponent
              text={dataHotel?.name}
              font={fontFamilies.bold}
              size={18}
            />

            <RowComponent>
              <AntDesign name="star" size={18} color={appColors.yellow} />

              <SpaceComponent width={8} />

              <TextComponent
                text={dataHotel?.rating}
                font={fontFamilies.medium}
                color={appColors.text}
                size={18}
              />
            </RowComponent>
          </RowComponent>

          <SpaceComponent height={10} />
          <RowComponent justify="space-between">
            <RowComponent>
              <Octicons name="location" size={18} color={appColors.text1} />
              <SpaceComponent width={8} />
              <TextComponent
                text={`${dataHotel?.district?.name}, ${dataHotel?.province?.name}`}
                font={fontFamilies.medium}
                size={12}
                color={appColors.text1}
              />
            </RowComponent>

            <RowComponent>
              <TextComponent
                text="Chỉ từ"
                font={fontFamilies.medium}
                size={14}
                color={appColors.text}
              />
              <SpaceComponent width={8} />
              <TextComponent
                text={`${dataHotel?.priceMin
                  .toLocaleString('en-US')
                  .replace(/,/g, '.')}.000đ`}
                font={fontFamilies.medium}
                size={18}
                color={appColors.text}
              />
            </RowComponent>
          </RowComponent>

          <SpaceComponent height={34} />
          <View>
            <RowComponent justify="space-between">
              <TextComponent
                text="Public facilities"
                font={fontFamilies.semiBold}
                size={16}
              />

              <GestureHandlerRootView>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UtilHotelScreen', {
                      utils: dataHotel?.utils,
                    })
                  }>
                  <TextComponent
                    text="See more"
                    font={fontFamilies.semiBold}
                    size={14}
                    color={appColors.primary}
                  />
                </TouchableOpacity>
              </GestureHandlerRootView>
            </RowComponent>

            <SpaceComponent height={10} />
            <RowComponent justify="space-between">
              {dataHotel?.utils?.map(
                (util, index) =>
                  index < 4 && (
                    <View
                      key={index}
                      style={{
                        alignItems: 'center',
                        height: 80,
                        width: 80,
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: appColors.gray1,
                        borderRadius: 10,
                        paddingHorizontal: 4,
                        paddingVertical: 4,
                      }}>
                      {util.icon === 'wifi' ? (
                        <Feather
                          name={util.icon}
                          size={24}
                          color={appColors.text}
                        />
                      ) : util.icon === 'chair-alt' ? (
                        <MaterialIcons
                          name={util.icon}
                          size={24}
                          color={appColors.text}
                        />
                      ) : util.icon === 'elevator' ? (
                        <Foundation
                          name={util.icon}
                          size={24}
                          color={appColors.text}
                        />
                      ) : util.icon === 'bathtub-outline' ||
                        util.icon === 'iron-outline' ||
                        util.icon === 'hair-dryer-outline' ||
                        util.icon === 'pool' ||
                        util.icon === 'fridge-outline' ? (
                        <MaterialCommunityIcons
                          name={util.icon}
                          size={24}
                          color={appColors.text}
                        />
                      ) : util.icon === 'television' ? (
                        <FontAwesome
                          name={util.icon}
                          size={24}
                          color={appColors.text}
                        />
                      ) : util.icon === 'restaurant-outline' ||
                        util.icon === 'cafe-outline' ? (
                        <Ionicons
                          name={util.icon}
                          size={24}
                          color={appColors.text}
                        />
                      ) : util.icon === 'kitchen-set' ? (
                        <FontAwesome6
                          name={util.icon}
                          size={24}
                          color={appColors.text}
                        />
                      ) : (
                        ''
                      )}
                      <SpaceComponent height={8} />
                      <TextComponent
                        text={util.name}
                        size={12}
                        font={fontFamilies.semiBold}
                        styles={{textAlign: 'center'}}
                      />
                    </View>
                  ),
              )}
            </RowComponent>
          </View>

          <SpaceComponent height={34} />
          <View>
            <TextComponent
              text="Comment"
              font={fontFamilies.semiBold}
              size={16}
            />

            {dataComment.length > 0 ? (
              <>
                <SpaceComponent height={14} />

                <RowComponent styles={{alignItems: 'center'}}>
                  <TextComponent
                    text={dataHotel?.rating}
                    font={fontFamilies.semiBold}
                    size={34}
                  />
                  <SpaceComponent width={12} />
                  <View>
                    <TextComponent
                      text="Tuyệt vời"
                      font={fontFamilies.semiBold}
                      size={16}
                    />

                    <TextComponent
                      text={`${lengthComment
                        ?.toLocaleString('en-US')
                        .replace(/,/g, '.')} đánh giá`}
                      font={fontFamilies.medium}
                      size={16}
                      color={appColors.text1}
                    />
                  </View>
                </RowComponent>
              </>
            ) : (
              <></>
            )}

            <SpaceComponent height={10} />
            {dataComment?.map((com, index) => (
              <View key={index} style={{marginTop: 16}}>
                <RowComponent styles={{justifyContent: 'space-between'}}>
                  <RowComponent styles={{gap: 2}}>
                    {[1, 2, 3, 4, 5].map(e => (
                      <AntDesign
                        key={e}
                        name="star"
                        size={18}
                        color={
                          com.rating >= e ? appColors.yellow : appColors.gray
                        }
                      />
                    ))}
                  </RowComponent>
                  <TextComponent
                    text={com.idUser.name}
                    color={appColors.text1}
                    font={fontFamilies.medium}
                  />
                </RowComponent>

                <SpaceComponent height={10} />
                <TextComponent
                  text={com.content}
                  font={fontFamilies.medium}
                  size={16}
                  color={appColors.text}
                />

                {index === 0 && (
                  <View
                    style={{
                      marginTop: 16,
                      height: 1,
                      width: '100%',
                      backgroundColor: appColors.gray,
                    }}
                  />
                )}
              </View>
            ))}

            {dataComment.length > 0 ? (
              <>
                <SpaceComponent height={20} />
                <RowComponent justify="flex-end">
                  <GestureHandlerRootView>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EvaluateScreen', {
                          id: id,
                          rating: dataHotel?.rating,
                          lengthComment: lengthComment,
                        })
                      }
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <TextComponent
                        text="See all"
                        color={appColors.primary}
                        font={fontFamilies.semiBold}
                      />
                      <AntDesign
                        name="right"
                        size={12}
                        color={appColors.yellow}
                      />
                    </TouchableOpacity>
                  </GestureHandlerRootView>
                </RowComponent>
              </>
            ) : (
              <></>
            )}
          </View>

          <SpaceComponent height={24} />
          <View>
            <TextComponent text="Map" font={fontFamilies.semiBold} size={16} />

            <SpaceComponent height={10} />
            <MapView
              style={{width: '100%', height: 200}}
              initialRegion={{
                latitude: dataHotel?.locationX || 0,
                longitude: dataHotel?.locationY || 0,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            />
          </View>
        </SectionComponent>

        <SpaceComponent height={100} />
      </ContainerComponent>

      <View
        style={[
          {
            width: '100%',
            height: 90,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            paddingHorizontal: 16,
            backgroundColor: appColors.white1,
            justifyContent: 'center',
          },
          globalStyles.shadow,
        ]}>
        <RowComponent
          styles={{
            gap: 26,
            alignItems: 'center',
          }}>
          <GestureHandlerRootView>
            <TouchableOpacity
              onPress={() => hanldeLike(!listLike.includes(dataHotel?._id))}
              style={{
                alignItems: 'center',
                height: 58,
                width: 58,
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: appColors.gray1,
                borderRadius: 10,
              }}>
              <Octicons
                name="heart-fill"
                size={20}
                color={
                  listLike.includes(dataHotel?._id)
                    ? appColors.red
                    : appColors.text1
                }
              />
            </TouchableOpacity>
          </GestureHandlerRootView>
          <View style={{flex: 1}}>
            <ButtonComponent
              onPress={() =>
                navigation.navigate('ListRoomScreen', {idHotel: id})
              }
              type="primary"
              text="Chọn phòng"></ButtonComponent>
          </View>
        </RowComponent>
      </View>
    </View>
  );
};

export default DetailHotelScreen;
