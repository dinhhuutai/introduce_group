import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  SectionComponent,
  SpaceComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';
import {useRoute} from '@react-navigation/native';

const BookingCancelScreen = ({navigation}) => {
  const route = useRoute();
  const {methodPaymennt} = route.params;

  return (
    <ContainerComponent back>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Image
          style={{width: 150, height: 150}}
          source={require('../../assets/images/cancel.png')}
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: fontFamilies.bold,
            color: appColors.text,
          }}>
          Đã hủy
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fontFamilies.medium,
            color: appColors.text,
            textAlign: 'center',
            marginTop: 14,
            paddingHorizontal: 16,
            lineHeight: 20,
          }}>{`Đã hủy đặt phòng do thanh toán qua ${methodPaymennt} thất bại.`}</Text>
      </View>

      <SpaceComponent height={50} />
      <SectionComponent
        styles={{
          alignItems: 'center',
          bottom: 0,
          position: 'absolute',
          left: 0,
          right: 0,
        }}>
        <ButtonComponent
          onPress={() => navigation.navigate('Main')}
          type="primary"
          text="Back to home"></ButtonComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default BookingCancelScreen;
