import {View, Text, StatusBar} from 'react-native';
import React from 'react';
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

const data = {
  _id: '004Wf32QR',
  idUser: {
    name: 'Dinh Huu Tai',
    phone: '0123456789',
  },
  checkIn: new Date(2024, 3, 1),
  checkOut: new Date(2024, 3, 5),
  idHotel: {
    name: 'Hotel 1',
    province: {
      name: 'Tp.Hồ Chí Minh',
    },
    district: {
      name: 'Quận 3',
    },
  },
  idRoom: {
    name: 'Room 1',
  },
  price: 700,
  people: {
    adult: 4,
    kid: 2,
  },
  methodPaymennt: 1,
};

const DetailBookingScreen = () => {
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
            {data._id}
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
            {data.idUser.name}
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
            {data.idUser.phone}
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
              {moment(data.checkIn).format('DD/MM/YYYY')}
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
              {moment(data.checkOut).format('DD/MM/YYYY').toString()}
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
            {data.idHotel.name}
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
            {data.idRoom.name}
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
                text={data.people.adult ? `${data.people.adult} adult` : ''}
                font={fontFamilies.medium}
                size={14}
              />
              {data.people.kid ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Octicons
                    style={{marginHorizontal: 14}}
                    name="dot-fill"
                    size={10}
                    color={appColors.text1}
                  />
                  <TextComponent
                    text={`${data.people.kid} kid`}
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
            Payment method
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text1,
            }}>{`Thanh toán tại khách sạn`}</Text>
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
            }}>{`${data.price
            ?.toLocaleString('en-US')
            .replace(/,/g, '.')}.000đ`}</Text>
        </View>
      </View>
    </ContainerComponent>
  );
};

export default DetailBookingScreen;
