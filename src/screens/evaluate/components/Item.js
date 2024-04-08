import {View, Text} from 'react-native';
import React from 'react';
import {appColors} from '../../../constants/appColors';
import {RowComponent, SpaceComponent, TextComponent} from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {fontFamilies} from '../../../constants/fontFamilies';
import FormattedDate from '../../../utils/formattedDate';
import moment from 'moment';

const Item = ({item}) => {
  return (
    <View style={{marginTop: 16}}>
      <RowComponent styles={{gap: 2}}>
        {[1, 2, 3, 4, 5].map(e => (
          <AntDesign
            key={e}
            name="star"
            size={18}
            color={item.rating >= e ? appColors.yellow : appColors.gray}
          />
        ))}
      </RowComponent>

      <SpaceComponent height={8} />
      <TextComponent
        text={item.idRoom.name}
        size={16}
        font={fontFamilies.semiBold}
      />

      <SpaceComponent height={6} />
      <RowComponent styles={{alignItems: 'center'}}>
        <TextComponent
          text={moment(item?.createDate).format('DD/MM/YYYY')}
          font={fontFamilies.medium}
          color={appColors.text1}
        />
        <Entypo name="dot-single" size={16} color={appColors.text1} />
        <TextComponent
          text={item?.idUser.name}
          font={fontFamilies.medium}
          color={appColors.text1}
        />
      </RowComponent>

      <SpaceComponent height={8} />
      <TextComponent
        text={item?.content}
        font={fontFamilies.medium}
        color={appColors.text1}
        size={16}
      />

      <View
        style={{
          marginTop: 16,
          height: 1,
          width: '100%',
          backgroundColor: appColors.gray,
        }}
      />
    </View>
  );
};

export default Item;
