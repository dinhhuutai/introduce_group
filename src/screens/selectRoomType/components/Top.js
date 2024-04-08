import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {appColors} from '../../../constants/appColors';

const data = [
  {label: 'Family room', value: '1'},
  {label: 'Single room', value: '2'},
  {label: 'Double room', value: '3'},
  {label: 'Quad room', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const Top = () => {
  const [value, setValue] = useState(data[0]);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      <SpaceComponent height={30} />

      <SectionComponent>
        <TextComponent
          text="Room type"
          font={fontFamilies.semiBold}
          size={16}
        />

        <SpaceComponent height={10} />

        <Dropdown
          style={[isFocus && {borderColor: 'blue'}]}
          placeholderStyle={{}}
          selectedTextStyle={{
            fontSize: 14,
            fontFamily: fontFamilies.semiBold,
            color: appColors.text,
          }}
          inputSearchStyle={{}}
          iconStyle={{}}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderRightIcon={() =>
            !isFocus ? (
              <FontAwesome6
                name="sort-down"
                size={20}
                color={appColors.text1}
              />
            ) : (
              <FontAwesome6 name="sort-up" size={20} color={appColors.text1} />
            )
          }
        />
      </SectionComponent>
    </>
  );
};

export default Top;
