import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from './Card';
import moment from 'moment';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {appColors} from '../../../../constants/appColors';

const Item = ({data}) => {
  console.log(data);
  return (
    <View>
      <Text
        style={{
          fontFamily: fontFamilies.bold,
          fontSize: 16,
          marginTop: 10,
          color: appColors.text,
        }}>
        {data.date}
      </Text>
      {data?.items.map(item => (
        <Card data={item} key={item._id} />
      ))}
    </View>
  );
};

export default Item;
