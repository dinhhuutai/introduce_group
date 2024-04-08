import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import CheckBox from '@react-native-community/checkbox';
import {appColors} from '../../../constants/appColors';
import utilHotelAPI from '../../../apis/utilHotelApi';

const Util = ({valueUtil, setValueUtil}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await utilHotelAPI.HandleUtilHotel('/getAll');

    const dataCheckBox = res.data.map(util => ({...util, check: false}));

    setToggleCheckBox(dataCheckBox);

  };

  const handleValueUtil = (value, index) => {
    const data = [...toggleCheckBox];

    const dataNew = data.map(util => {
      if (util._id === index) {
        return {
          ...util,
          check: value,
        };
      } else {
        return util;
      }
    });
    setToggleCheckBox(dataNew);

    let dataId = dataNew.filter(util => util.check);
    dataId = dataId.map(util => util._id);
    setValueUtil(dataId);
  };

  return (
    <SectionComponent>
      <SpaceComponent height={10} />
      <TextComponent text="Tiện ích" font={fontFamilies.semiBold} size={16} />

      <View style={{paddingHorizontal: 16}}>
        {toggleCheckBox.map(toggle => (
          <RowComponent
            justify="space-between"
            styles={{marginTop: 8}}
            key={toggle._id}>
            <TextComponent text={toggle.name} font={fontFamilies.semiBold} />
            <CheckBox
              tintColors={{true: appColors.primary1, false: appColors.text1}}
              value={toggle.check}
              onValueChange={newValue => handleValueUtil(newValue, toggle._id)}
            />
          </RowComponent>
        ))}
      </View>
    </SectionComponent>
  );
};

export default Util;
