import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import Octicons from 'react-native-vector-icons/Octicons';
import {appColors} from '../../../constants/appColors';
import {
  searchSelector,
  setQuantityPerson,
} from '../../../redux/reducers/searchReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Bottom = () => {
  const [valueAdult, setValueAdult] = useState(0);
  const [valueKid, setValueKid] = useState(0);

  const search = useSelector(searchSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setValueAdult(search.searchQuantityPerson.adult);
    setValueKid(search.searchQuantityPerson.kid);
  }, []);

  const handleDownAdult = () => {
    if (valueAdult > 0) {
      setValueAdult(valueAdult * 1 - 1);
    }
  };

  const handleUpAdult = () => {
    if (valueAdult < 10) {
      setValueAdult(valueAdult * 1 + 1);
    }
  };

  const handleDownKid = () => {
    if (valueKid > 0) {
      setValueKid(valueKid * 1 - 1);
    }
  };

  const handleUpKid = () => {
    if (valueKid < 10) {
      setValueKid(valueKid * 1 + 1);
    }
  };

  const handleSaveQuantityPerson = async () => {
    dispatch(
      setQuantityPerson({
        adult: valueAdult,
        kid: valueKid,
      }),
    );
    navigation.goBack();
  };

  return (
    <>
      <SpaceComponent height={20} />
      <SectionComponent>
        <RowComponent justify="space-between">
          <TextComponent
            styles={{flex: 1}}
            text="Adult"
            font={fontFamilies.semiBold}
            size={16}
          />

          <View style={{alignItems: 'center'}}></View>

          <RowComponent
            justify="space-between"
            styles={{alignItems: 'center', gap: 24}}>
            <TouchableOpacity
              onPress={handleDownAdult}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                backgroundColor:
                  valueAdult === '0' || valueAdult <= 0
                    ? appColors.gray
                    : appColors.primary,
                borderRadius: 4,
              }}>
              <Octicons
                name="dash"
                size={20}
                color={
                  valueAdult === '0' || valueAdult <= 0
                    ? appColors.text1
                    : appColors.white
                }
              />
            </TouchableOpacity>

            <TextInput
              style={{textAlign: 'center', height: 40, width: 40, fontSize: 16}}
              value={valueAdult + ''}
              keyboardType="number-pad"
              onChangeText={val => {
                val > 10 || val < 0 ? 1 : setValueAdult(val);
              }}
            />

            <TouchableOpacity
              onPress={handleUpAdult}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                backgroundColor:
                  valueAdult === '10' || valueAdult >= 10
                    ? appColors.gray
                    : appColors.primary,
                borderRadius: 4,
              }}>
              <Octicons
                name="plus"
                size={20}
                color={
                  valueAdult === '10' || valueAdult >= 10
                    ? appColors.text1
                    : appColors.white
                }
              />
            </TouchableOpacity>
          </RowComponent>
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={10} />
      <SectionComponent>
        <RowComponent justify="space-between">
          <TextComponent
            styles={{flex: 1}}
            text="Kid"
            font={fontFamilies.semiBold}
            size={16}
          />

          <View style={{alignItems: 'center'}}></View>

          <RowComponent
            justify="space-between"
            styles={{alignItems: 'center', gap: 24}}>
            <TouchableOpacity
              onPress={handleDownKid}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                backgroundColor:
                  valueKid === '0' || valueKid <= 0
                    ? appColors.gray
                    : appColors.primary,
                borderRadius: 4,
              }}>
              <Octicons
                name="dash"
                size={20}
                color={
                  valueKid === '0' || valueKid <= 0
                    ? appColors.text1
                    : appColors.white
                }
              />
            </TouchableOpacity>

            <TextInput
              style={{textAlign: 'center', height: 40, width: 40, fontSize: 16}}
              value={valueKid + ''}
              keyboardType="number-pad"
              onChangeText={val => {
                val > 10 || val < 0 ? 0 : setValueKid(val);
              }}
            />

            <TouchableOpacity
              onPress={handleUpKid}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                backgroundColor:
                  valueKid === '10' || valueKid >= 10
                    ? appColors.gray
                    : appColors.primary,
                borderRadius: 4,
              }}>
              <Octicons
                name="plus"
                size={20}
                color={
                  valueKid === '10' || valueKid >= 10
                    ? appColors.text1
                    : appColors.white
                }
              />
            </TouchableOpacity>
          </RowComponent>
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={40} />

      <SectionComponent
        styles={{
          alignItems: 'center',
          bottom: 0,
          position: 'absolute',
          left: 0,
          right: 0,
        }}>
        <ButtonComponent
          onPress={handleSaveQuantityPerson}
          type="primary"
          text="Áp dụng"></ButtonComponent>
      </SectionComponent>
    </>
  );
};

export default Bottom;
