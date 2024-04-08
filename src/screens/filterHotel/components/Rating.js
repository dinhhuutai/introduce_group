import {View, Text} from 'react-native';
import React from 'react';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../../../constants/appColors';

const Rating = ({valueRating, setValueRating}) => {
  return (
    <SectionComponent>
      <SpaceComponent height={10} />
      <TextComponent
        text="Điểm đánh giá"
        font={fontFamilies.semiBold}
        size={16}
      />

      <SpaceComponent height={10} />
      <RowComponent styles={{gap: 12}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => setValueRating(4.5)}
            style={{
              backgroundColor:
                valueRating === 4.5 ? appColors.yellow1 : appColors.gray,
              borderWidth: 1,
              borderColor:
                valueRating === 4.5 ? appColors.yellow : appColors.gray,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
              borderRadius: 20,
            }}>
            <RowComponent styles={{alignItems: 'flex-end', gap: 2}}>
              <AntDesign name="right" size={14} color={appColors.text} />
              <RowComponent styles={{alignItems: 'center', gap: 6}}>
                <TextComponent text="4.5" font={fontFamilies.semiBold} />
                <AntDesign name="star" size={20} color={appColors.yellow} />
              </RowComponent>
            </RowComponent>
          </TouchableOpacity>
        </GestureHandlerRootView>

        <GestureHandlerRootView style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => setValueRating(4)}
            style={{
              backgroundColor:
                valueRating === 4 ? appColors.yellow1 : appColors.gray,
              borderWidth: 1,
              borderColor:
                valueRating === 4 ? appColors.yellow : appColors.gray,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
              borderRadius: 20,
            }}>
            <RowComponent styles={{alignItems: 'flex-end', gap: 2}}>
              <AntDesign name="right" size={14} color={appColors.text} />
              <RowComponent styles={{alignItems: 'center', gap: 6}}>
                <TextComponent text="4.0" font={fontFamilies.semiBold} />
                <AntDesign name="star" size={20} color={appColors.yellow} />
              </RowComponent>
            </RowComponent>
          </TouchableOpacity>
        </GestureHandlerRootView>

        <GestureHandlerRootView style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => setValueRating(3.5)}
            style={{
              backgroundColor:
                valueRating === 3.5 ? appColors.yellow1 : appColors.gray,
              borderWidth: 1,
              borderColor:
                valueRating === 3.5 ? appColors.yellow : appColors.gray,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
              borderRadius: 20,
            }}>
            <RowComponent styles={{alignItems: 'flex-end', gap: 2}}>
              <AntDesign name="right" size={14} color={appColors.text} />
              <RowComponent styles={{alignItems: 'center', gap: 6}}>
                <TextComponent text="3.5" font={fontFamilies.semiBold} />
                <AntDesign name="star" size={20} color={appColors.yellow} />
              </RowComponent>
            </RowComponent>
          </TouchableOpacity>
        </GestureHandlerRootView>
      </RowComponent>
    </SectionComponent>
  );
};

export default Rating;
