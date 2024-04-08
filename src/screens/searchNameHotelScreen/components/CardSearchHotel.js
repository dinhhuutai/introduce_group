import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {appColors} from '../../../constants/appColors';
import {RowComponent, SpaceComponent, TextComponent} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';

const CardSearchHotel = ({data}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailHotelScreen', {id: data._id})}
      style={{marginTop: 16}}>
      <RowComponent>
        <FontAwesome6 name="hotel" size={22} color={appColors.primary1} />

        <View
          style={{
            marginLeft: 14,
          }}>
          <TextComponent
            text={data.name}
            font={fontFamilies.semiBold}
            size={16}
          />
          <SpaceComponent height={4} />
          <TextComponent
            text={data.address}
            size={14}
            color={appColors.text1}
          />
        </View>
      </RowComponent>

      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: appColors.gray,
          marginTop: 16,
        }}
      />
    </TouchableOpacity>
  );
};

export default CardSearchHotel;
