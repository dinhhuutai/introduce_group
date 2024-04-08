import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {appColors} from '../../../../constants/appColors';
import {SpaceComponent} from '../../../../components';
import {fontFamilies} from '../../../../constants/fontFamilies';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Card = ({item, setIsModal}) => {
  const navigation = useNavigation();

  return (
    <View
      key={item._id}
      style={[
        {
          borderWidth: 0.4,
          borderColor: appColors.text1,
          borderRadius: 10,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginTop: 20,
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Image
            style={{height: 70, width: 140, borderRadius: 10}}
            source={item?.idHotel.image}
          />
        </TouchableOpacity>

        <SpaceComponent width={10} />
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fontFamilies.semiBold,
                color: appColors.text,
              }}>
              {item?.idHotel.name}
            </Text>
            <SpaceComponent height={6} />
            <Text
              style={{
                fontSize: 12,
              }}>{`${item?.idHotel?.district?.name}, ${item?.idHotel?.province?.name}`}</Text>
          </View>
          <Text style={{fontSize: 14}}>{`${item?.idRoom.price
            .toLocaleString('en-US')
            .replace(/,/g, '.')}.000đ/Night`}</Text>
        </View>

        {item?.status !== 1 && (
          <View>
            <AntDesign
              name={`${
                item?.status === 2 ? 'checkcircle' : 'exclamationcircle'
              }`}
              style={{
                color: item?.status === 2 ? appColors.green : appColors.red,
                marginTop: 6,
                marginRight: 4,
              }}
              size={18}
            />
          </View>
        )}
      </View>

      {item?.status === 1 ? (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => setIsModal(true)}
            style={{
              minWidth: 110,
              borderWidth: 1,
              borderColor: appColors.primary1,
              paddingVertical: 4,
              alignItems: 'center',
              borderRadius: 20,
              backgroundColor: 'transparent',
            }}>
            <Text
              style={{
                color: appColors.primary1,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('DetailBookingScreen')}
            style={{
              minWidth: 110,
              borderWidth: 1,
              borderColor: appColors.primary1,
              paddingVertical: 4,
              alignItems: 'center',
              borderRadius: 20,
              backgroundColor: appColors.primary1,
            }}>
            <Text
              style={{
                color: appColors.white,
              }}>
              View Booking
            </Text>
          </TouchableOpacity>
        </View>
      ) : item?.status === 2 ? (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              width: 260,
              borderWidth: 1,
              borderColor: appColors.gray1,
              paddingVertical: 5,
              alignItems: 'center',
              borderRadius: 20,
              backgroundColor: appColors.gray1,
            }}>
            <Text style={{color: appColors.primary1}}>Booking Completed</Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              paddingVertical: 5,
              alignItems: 'center',
            }}>
            <Text style={{color: appColors.red1}}>
              You canceled this hotel booking
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Card;
