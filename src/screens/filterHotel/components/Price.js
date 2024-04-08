import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import InputRange from '../../../components/InputRange';
import {appColors} from '../../../constants/appColors';

const Price = ({valuePrice, setValuePrice}) => {


  return (
    <SectionComponent>
      <SpaceComponent height={10} />
      <TextComponent text="Khoảng giá" font={fontFamilies.semiBold} size={16} />

      <SpaceComponent height={6} />
      <InputRange
        min={20}
        max={10000}
        step={20}
        thumbTintColor={appColors.primary1}
        minimumTrackTintColor={appColors.primary1}
        onValueChange={val => setValuePrice(val)}
        thumbBgColor={appColors.white}
        thumbBorderColor={appColors.primary1}
        thumbBorderWidth={3}
      />

      <SpaceComponent height={6} />
      <RowComponent
        styles={{gap: 14, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: appColors.gray,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <TextComponent
            size={14}
            font={fontFamilies.semiBold}
            color={appColors.text1}
            text="Giá tối thiểu"
          />
          <SpaceComponent height={4} />
          <TextComponent
            size={17}
            font={fontFamilies.semiBold}
            text={`${valuePrice[0].toLocaleString('en-US').replace(/,/g, '.')}.000đ`}
          />
        </View>

        <View
          style={{height: 2, width: 10, backgroundColor: appColors.gray1}}
        />

        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: appColors.gray,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <TextComponent
            size={14}
            font={fontFamilies.semiBold}
            color={appColors.text1}
            text="Giá tối đa"
          />
          <SpaceComponent height={4} />
          <TextComponent
            size={17}
            font={fontFamilies.semiBold}
            text={`${valuePrice[1].toLocaleString('en-US').replace(/,/g, '.')}.000đ`}
          />
        </View>
      </RowComponent>
    </SectionComponent>
  );
};

export default Price;
