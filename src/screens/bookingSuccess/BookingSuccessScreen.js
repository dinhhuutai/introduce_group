import {View, Text, Image} from 'react-native';
import React from 'react';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
} from '../../components';

const data = {
  name: 'JW Marriott hotel',
  address: 'New delhi',
  numNight: 3,
  price: 2400,
};

const BookingSuccessScreen = ({navigation}) => {
  return (
    <View>
      <View style={{alignItems: 'center', marginTop: 80}}>
        <Image source={require('../../assets/images/success.png')} />
      </View>
      <View
        style={{paddingHorizontal: 16, alignItems: 'center', marginTop: 30}}>
        <Text
          style={{
            fontSize: 22,
            color: appColors.text,
            fontFamily: fontFamilies.bold,
          }}>
          Booking Successfull!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: appColors.text,
            fontFamily: fontFamilies.medium,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Congratulations! your payment has been confirmed here are your order
          details
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: 16,
          borderWidth: 1,
          borderColor: appColors.text1,
          borderRadius: 12,
          marginTop: 50,
        }}>
        <View
          style={{alignItems: 'center', marginTop: 16, paddingHorizontal: 16}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            {data.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            paddingHorizontal: 16,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Octicons name="location" size={18} color={appColors.text1} />
            <SpaceComponent width={6} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text1,
              }}>
              {data.address}
            </Text>
          </View>
          <Octicons
            style={{marginHorizontal: 14}}
            name="dot-fill"
            size={10}
            color={appColors.text1}
          />
          <Text
            style={{
              fontSize: 15,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>{`${data.numNight} Nights`}</Text>
        </View>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.text1,
            marginVertical: 16,
          }}></View>

        <View
          style={{
            paddingHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Price Detail
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text1,
              }}>
              Property Fee
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text,
              }}>{`${data.price
              ?.toLocaleString('en-US')
              .replace(/,/g, '.')}.000đ`}</Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.text1,
            marginVertical: 16,
          }}></View>

        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            TOTAL Price
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>{`${data.price
            ?.toLocaleString('en-US')
            .replace(/,/g, '.')}.000đ`}</Text>
        </View>
      </View>

      <SpaceComponent height={50} />
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={() => navigation.navigate('Main')}
          type="primary"
          text="Back to home"></ButtonComponent>
      </SectionComponent>
    </View>
  );
};

export default BookingSuccessScreen;
