import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {appColors} from '../../constants/appColors';
import moment from 'moment';
import {fontFamilies} from '../../constants/fontFamilies';
import bookingAPI from '../../apis/bookingApi';
import {useNavigation, useRoute} from '@react-navigation/native';

const DetailBookingScreen = () => {
  const [data, setData] = useState();

  const route = useRoute();
  const {id} = route.params;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await bookingAPI.HandleBooking(`/getById/${id}`);

    if (res.success) {
      setData(res.data);
    }
  };

  return (
    <ContainerComponent back title="Detail booking" isScroll>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <View style={{paddingHorizontal: 16}}>
        <SpaceComponent height={14} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Booking ID
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>
            {data?.encodeId}
          </Text>
        </View>
        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Name
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>
            {data?.idUser.name}
          </Text>
        </View>
        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Phone
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>
            {data?.idUser.phone}
          </Text>
        </View>
        <SpaceComponent height={24} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 36,
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text,
              }}>
              Check In
            </Text>
            <SpaceComponent height={10} />
            <Text
              style={{
                fontSize: 14,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text1,
              }}>
              {moment(data?.checkIn).format('DD/MM/YYYY')}
            </Text>
          </View>

          <View>
            <AntDesign name="arrowright" size={18} color={appColors.text} />
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text,
              }}>
              Check In
            </Text>
            <SpaceComponent height={10} />
            <Text
              style={{
                fontSize: 14,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text1,
              }}>
              {moment(data?.checkOut).format('DD/MM/YYYY').toString()}
            </Text>
          </View>
        </View>
        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Hotel
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>
            {data?.idHotel.name}
          </Text>
        </View>
        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Address
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>{`${data?.idHotel?.district?.name}, ${data?.idHotel?.province?.name}`}</Text>
        </View>
        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Room
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>
            {data?.idRoom.name}
          </Text>
        </View>
        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            People
          </Text>
          <View>
            <RowComponent>
              <TextComponent
                text={data?.people.adult ? `${data?.people.adult} adult` : ''}
                font={fontFamilies.medium}
                size={14}
              />
              {data?.people.kid ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Octicons
                    style={{marginHorizontal: 14}}
                    name="dot-fill"
                    size={10}
                    color={appColors.text1}
                  />
                  <TextComponent
                    text={`${data?.people.kid} kid`}
                    font={fontFamilies.medium}
                    size={14}
                  />
                </View>
              ) : (
                ''
              )}
            </RowComponent>
          </View>
        </View>
        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Thanh toán
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>{`${data?.methodPayment}`}</Text>
        </View>
        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Tình trạng thanh toán
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>{`${data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</Text>
        </View>
        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Price
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>{`${data?.price
            ?.toLocaleString('en-US')
            .replace(/,/g, '.')}.000đ`}</Text>
        </View>

        <SpaceComponent height={24} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}>
            Tình trạng
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>
            {data?.statusContent}
          </Text>
        </View>
      </View>
    </ContainerComponent>
  );
};

export default DetailBookingScreen;
