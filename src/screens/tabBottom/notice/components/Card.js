import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import successNotice from '../../../../assets/images/successNotice.png';
import cancelNotice from '../../../../assets/images/cancelNotice.png';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {appColors} from '../../../../constants/appColors';

const Card = ({data}) => {
  return (
    <View
      style={{
        position: 'relative',
        marginTop: 16,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
      <Image
        style={{width: '100%', borderRadius: 12}}
        source={data.statusNotice === 1 ? successNotice : cancelNotice}
      />

      <Text
        style={{
          position: 'absolute',
          marginTop: 20,
          marginLeft: 80,
          fontFamily: fontFamilies.semiBold,
          color: appColors.text,
          fontSize: 16,
        }}>
        {data?.title}
      </Text>

      <Text
        style={{
          position: 'absolute',
          marginTop: 48,
          marginLeft: 80,
          lineHeight: 20,
        }}>
        {data?.content}
      </Text>
    </View>
  );
};

export default Card;
