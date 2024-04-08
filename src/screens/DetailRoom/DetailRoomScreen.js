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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ArrowLeft} from 'iconsax-react-native';
import roomAPI from '../../apis/roomApi';

const DetailRoomScreen = () => {
  const [data, setData] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);

  const route = useRoute();
  const {id} = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await roomAPI.HandleRoom(`/getById/${id}`);

    setData(res.data);
  };

  return (
    <View style={{flex: 1}}>
      <ContainerComponent
        onScrollPosition={val => setScrollPosition(val)}
        isScroll
        title={scrollPosition >= 84 ? data?.name : false}
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
              text={data?.name}
              font={fontFamilies.bold}
              size={20}
            />

            <TextComponent
              text={`${data?.price
                .toLocaleString('en-US')
                .replace(/,/g, '.')}.000đ/Night`}
              font={fontFamilies.semiBold}
              size={16}
              color={appColors.red1}
            />
          </RowComponent>

          <SpaceComponent height={10} />
          <RowComponent>
            <Octicons name="person" size={18} color={appColors.text} />
            <SpaceComponent width={10} />

            <Text
              style={{
                fontFamily: fontFamilies.semiBold,
                fontSize: 14,
                color: appColors.text,
              }}>
              {data?.maxPeople}
            </Text>
          </RowComponent>

          <SpaceComponent height={34} />

          <View>
            <TextComponent
              text="Room facilities"
              font={fontFamilies.semiBold}
              size={16}
            />

            <SpaceComponent height={10} />
            <RowComponent justify="space-between">
              <TextComponent
                text={`${data?.facilities.bed} Bedrooms`}
                font={fontFamilies.semiBold}
                size={14}
              />
              <TextComponent
                text={`${data?.facilities.bath} Bathroom`}
                font={fontFamilies.semiBold}
                size={14}
              />
              <TextComponent
                text={`${data?.facilities.guest} Guestroom`}
                font={fontFamilies.semiBold}
                size={14}
              />
            </RowComponent>
          </View>

          <SpaceComponent height={34} />
          <View>
            <RowComponent justify="space-between">
              <TextComponent
                text="Public facilities"
                font={fontFamilies.semiBold}
                size={16}
              />
            </RowComponent>

            <SpaceComponent height={10} />
            <RowComponent
              justify="flex-start"
              styles={{flexWrap: 'wrap', gap: 10}}>
              {data?.utils?.map((util, index) => (
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
              ))}
            </RowComponent>
          </View>

          <SpaceComponent height={34} />
          <View>
            <TextComponent
              text="Room type"
              font={fontFamilies.semiBold}
              size={16}
            />

            <SpaceComponent height={8} />

            <TextComponent
              text="Family room"
              font={fontFamilies.semiBold}
              size={14}
            />
          </View>

          <SpaceComponent height={34} />
          <View>
            <TextComponent
              text="Description"
              font={fontFamilies.semiBold}
              size={16}
            />

            <SpaceComponent height={10} />
            <TextComponent
              text={data?.desc}
              font={fontFamilies.semiBold}
              size={14}
              color={appColors.text1}
              styles={{lineHeight: 20}}
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
          <View style={{flex: 1}}>
            <ButtonComponent
              onPress={() => navigation.navigate('BookingScreen', {id})}
              type="primary"
              text="Booking"></ButtonComponent>
          </View>
        </RowComponent>
      </View>
    </View>
  );
};

export default DetailRoomScreen;
