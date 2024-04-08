import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {appColors} from '../../../../constants/appColors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';

const ModalCancelBooking = ({setIsModal}) => {
  const navigation = useNavigation();

  const handleYes = async () => {
    setIsModal(false);
  };

  return (
    <Modal style={{flex: 1}} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: appColors.white,
            width: '100%',
            height: 300,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            alignItems: 'center',
            paddingHorizontal: 36,
          }}>
          <View
            style={{
              height: 4,
              width: 50,
              backgroundColor: appColors.gray,
              marginTop: 8,
            }}></View>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 18,
              fontFamily: fontFamilies.bold,
              color: appColors.red1,
            }}>
            Cancel Booking
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 26,
              fontSize: 16,
              fontFamily: fontFamilies.bold,
              color: appColors.text,
            }}>
            Are you sure you want to cancel your hotel booking?
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 26,
              fontSize: 16,
              fontFamily: fontFamilies.medium,
              color: appColors.text1,
            }}>
            Only 80% would be refunded according to our policy
          </Text>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 36,
            }}>
            <TouchableOpacity
              onPress={() => setIsModal(false)}
              style={{
                minWidth: 140,
                paddingVertical: 12,
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: appColors.gray,
              }}>
              <Text
                style={{
                  color: appColors.primary1,
                  fontFamily: fontFamilies.bold,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleYes()}
              style={{
                minWidth: 140,
                paddingVertical: 12,
                alignItems: 'center',
                borderRadius: 8,
                alignItems: 'center',
                backgroundColor: appColors.primary1,
              }}>
              <Text
                style={{
                  color: appColors.white,
                  fontFamily: fontFamilies.bold,
                }}>
                Yes, Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCancelBooking;
