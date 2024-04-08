import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColors} from '../../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';

const Card = ({item}) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        {
          marginBottom: 26,
          borderRadius: 16,
          backgroundColor: appColors.white,
        },
        globalStyles.shadow,
      ]}>
      <Image
        style={[
          {
            width: '100%',
            height: 260,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            resizeMode: 'cover',
          },
        ]}
        source={require('../../../assets/images/hotel-1.png')}
      />

      <SpaceComponent height={12} />

      <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
        <RowComponent justify="space-between">
          <TextComponent text={item?.name} font={fontFamilies.bold} size={18} />
          <TextComponent
            font={fontFamilies.bold}
            text={`${item.price
              .toLocaleString('en-US')
              .replace(/,/g, '.')}.000đ/Night`}
            size={16}
            color={appColors.red1}
          />
        </RowComponent>

        <SpaceComponent height={12} />

        <RowComponent justify="space-between">
          <RowComponent>
            <Octicons name="person" size={18} color={appColors.text} />
            <SpaceComponent width={10} />

            <Text
              style={{
                fontFamily: fontFamilies.semiBold,
                fontSize: 14,
                color: appColors.text,
              }}>
              {item?.maxPeople}
            </Text>
          </RowComponent>
          <ButtonComponent
            onPress={() =>
              navigation.navigate('DetailRoomScreen', {id: item._id})
            }
            text="Xem chi tiết"
            textColor={appColors.primary}></ButtonComponent>
        </RowComponent>

        <SpaceComponent height={20} />

        <RowComponent justify="space-between">
          {item?.facilities.bed && (
            <View style={{alignItems: 'center'}}>
              <MaterialIcons name="bed" size={18} color={appColors.text} />
              <SpaceComponent height={4} />
              <TextComponent
                text={`${item?.facilities.bed} Bedroom`}
                font={fontFamilies.semiBold}
                color={appColors.text}
              />
            </View>
          )}

          {item?.facilities.bath && (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="bathtub-outline"
                size={18}
                color={appColors.text}
              />
              <SpaceComponent height={4} />
              <TextComponent
                text={`${item?.facilities.bath} Bathroom`}
                font={fontFamilies.semiBold}
                color={appColors.text}
              />
            </View>
          )}

          {item?.facilities.guest && (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="sofa-outline"
                size={18}
                color={appColors.text}
              />
              <SpaceComponent height={4} />
              <TextComponent
                text={`${item?.facilities.guest} Guestroom`}
                font={fontFamilies.semiBold}
                color={appColors.text}
              />
            </View>
          )}
        </RowComponent>
      </View>

      <View style={{flex: 1, marginHorizontal: 16}}>
        <ButtonComponent
          onPress={() => navigation.navigate('BookingScreen', {id: item._id})}
          type="primary"
          text="Booking"></ButtonComponent>
      </View>
    </View>
  );
};

export default Card;
