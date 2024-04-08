import {View} from 'react-native';
import React from 'react';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import Octicons from 'react-native-vector-icons/Octicons';
import {appColors} from '../../../constants/appColors';

const Top = ({selectDate}) => {
  return (
    <>
      <SpaceComponent height={30} />

      <SectionComponent>
        <RowComponent styles={{gap: 20}}>
          <View style={{flex: 1}}>
            <TextComponent
              text="Checkin"
              font={fontFamilies.semiBold}
              size={16}
            />
            <SpaceComponent height={10} />
            <RowComponent
              styles={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: appColors.text,
                minHeight: 56,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 12,
              }}>
              <Octicons name="calendar" size={22} color={appColors.text} />
              <SpaceComponent width={14} />
              <TextComponent
                text={
                  selectDate?.startDate.d &&
                  `${
                    selectDate?.startDate.d < 10
                      ? '0' + selectDate?.startDate.d
                      : selectDate?.startDate.d
                  }/${
                    selectDate?.startDate.m < 10
                      ? '0' + selectDate?.startDate.m
                      : selectDate?.startDate.m
                  }/${selectDate?.startDate.y}`
                }
                font={fontFamilies.medium}
                size={18}
                color={appColors.text}
                styles={{flex: 1}}
              />
            </RowComponent>
          </View>
          <View style={{flex: 1}}>
            <TextComponent
              text="Checkout"
              font={fontFamilies.semiBold}
              size={16}
            />
            <SpaceComponent height={10} />
            <RowComponent
              styles={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: appColors.text,
                minHeight: 56,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 12,
              }}>
              <Octicons name="calendar" size={22} color={appColors.text} />
              <SpaceComponent width={14} />
              <TextComponent
                text={
                  selectDate?.endDate.d &&
                  `${
                    selectDate?.endDate.d < 10
                      ? '0' + selectDate?.endDate.d
                      : selectDate?.endDate.d
                  }/${
                    selectDate?.endDate.m < 10
                      ? '0' + selectDate?.endDate.m
                      : selectDate?.endDate.m
                  }/${selectDate?.endDate.y}`
                }
                font={fontFamilies.medium}
                size={18}
                color={appColors.text}
                styles={{flex: 1}}
              />
            </RowComponent>
          </View>
        </RowComponent>
      </SectionComponent>
    </>
  );
};

export default Top;
