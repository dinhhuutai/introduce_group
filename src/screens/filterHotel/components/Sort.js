import {View, Text} from 'react-native';
import React from 'react';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {RadioButton} from 'react-native-paper';
import {appColors} from '../../../constants/appColors';

const Sort = ({valueSort, setValueSort}) => {
  return (
    <SectionComponent>
      <SpaceComponent height={16} />
      <TextComponent text="Sắp xếp" font={fontFamilies.semiBold} size={16} />

      <SpaceComponent height={10} />
      <View
        style={{
          borderWidth: 1,
          borderColor: appColors.gray,
          borderRadius: 10,
          paddingHorizontal: 16,
          paddingVertical: 4,
        }}>
        <RowComponent justify="space-between">
          <TextComponent text="Phù hợp nhất" font={fontFamilies.semiBold} />
          <RadioButton
            color={appColors.primary1}
            uncheckedColor={appColors.text1}
            value={0}
            status={valueSort === 0 ? 'checked' : 'unchecked'}
            onPress={() => setValueSort(0)}
          />
        </RowComponent>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
            marginVertical: 4,
          }}></View>

        <RowComponent justify="space-between">
          <TextComponent
            text="Điểm đánh giá từ cao đến thấp"
            font={fontFamilies.semiBold}
          />
          <RadioButton
            color={appColors.primary1}
            uncheckedColor={appColors.text1}
            value={1}
            status={valueSort === 1 ? 'checked' : 'unchecked'}
            onPress={() => setValueSort(1)}
          />
        </RowComponent>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
            marginVertical: 4,
          }}></View>

        <RowComponent justify="space-between">
          <TextComponent
            text="Giá từ thấp đến cao"
            font={fontFamilies.semiBold}
          />
          <RadioButton
            color={appColors.primary1}
            uncheckedColor={appColors.text1}
            value={2}
            status={valueSort === 2 ? 'checked' : 'unchecked'}
            onPress={() => setValueSort(2)}
          />
        </RowComponent>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
            marginVertical: 4,
          }}></View>

        <RowComponent justify="space-between">
          <TextComponent
            text="Giá từ cao đến thấp"
            font={fontFamilies.semiBold}
          />
          <RadioButton
            color={appColors.primary1}
            uncheckedColor={appColors.text1}
            value={3}
            status={valueSort === 3 ? 'checked' : 'unchecked'}
            onPress={() => setValueSort(3)}
          />
        </RowComponent>
      </View>
    </SectionComponent>
  );
};

export default Sort;
