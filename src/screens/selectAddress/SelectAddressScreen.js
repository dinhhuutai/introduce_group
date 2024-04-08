import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {appColors} from '../../constants/appColors';
import addressAPI from '../../apis/addressApi';
import {useDispatch, useSelector} from 'react-redux';
import {searchSelector, setAddress} from '../../redux/reducers/searchReducer';
import {useNavigation} from '@react-navigation/native';

const SelectAddressScreen = () => {
  const [valueProvince, setValueProvince] = useState({name: '', _id: ''});
  const [dataProvince, setDataProvince] = useState([]);
  const [isFocusProvince, setIsFocusProvince] = useState(false);

  const [valueDistrict, setValueDistrict] = useState({name: '', _id: ''});
  const [dataDistrict, setDataDistrict] = useState([]);
  const [isFocusDistrict, setIsFocusDistrict] = useState(false);

  const [valueCommune, setValueCommune] = useState({name: '', _id: ''});
  const [dataCommune, setDataCommune] = useState([]);
  const [isFocusCommune, setIsFocusCommune] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const search = useSelector(searchSelector);

  useEffect(() => {
    if (search.searchAddress.province?.name) {
      setValueProvince(search.searchAddress.province);
    }

    if (search.searchAddress.district?.name) {
      setValueDistrict(search.searchAddress.district);
    }

    if (search.searchAddress.commune?.name) {
      setValueCommune(search.searchAddress.commune);
    }

    getData();
  }, []);


  const getData = async () => {
    console.log(1);
    const res = await addressAPI.HandleProvince('/getAll');
    console.log(2);

    setDataProvince(res.provinces);
  };

  const handleGetDataDistrict = async idProvince => {
    const res = await addressAPI.HandleDistrict(
      '/getByProvince',
      {idProvince},
      'post',
    );

    setDataDistrict(res.districts);
  };

  const handleGetDataCommune = async idDistrict => {
    const res = await addressAPI.HandleCommune(
      '/getByDistrict',
      {idDistrict},
      'post',
    );

    setDataCommune(res.communes);
  };

  const handleSaveAddress = async () => {
    dispatch(
      setAddress({
        province: valueProvince,
        district: valueDistrict,
        commune: valueCommune,
      }),
    );
    navigation.goBack();
  };

  return (
    <ContainerComponent back title="Address">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SectionComponent>
        <SpaceComponent height={40} />
        <View>
          <TextComponent
            text="Thành phố / tỉnh"
            font={fontFamilies.semiBold}
            size={16}
            styles={{
              color: appColors.text,
              fontFamily: fontFamilies.semiBold,
              fontSize: 14,
              position: 'absolute',
              paddingHorizontal: 4,
              backgroundColor: appColors.white,
              top: -10,
              left: 16,
              zIndex: 9999,
            }}
          />

          <Dropdown
            style={[
              {
                borderColor: appColors.gray,
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 8,
              },
            ]}
            placeholderStyle={{}}
            selectedTextStyle={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}
            inputSearchStyle={{}}
            iconStyle={{}}
            data={dataProvince}
            search
            maxHeight={300}
            labelField="name"
            valueField="_id"
            placeholder={!isFocusProvince ? 'Thành phố / tỉnh' : '...'}
            searchPlaceholder="Search..."
            value={valueProvince._id}
            onFocus={() => setIsFocusProvince(true)}
            onBlur={() => setIsFocusProvince(false)}
            onChange={item => {
              setValueProvince({_id: item._id, name: item.name});
              setIsFocusProvince(false);
              handleGetDataDistrict(item._id);
              setValueDistrict();
              setValueCommune();
            }}
            renderRightIcon={() => (
              <FontAwesome6
                name={!isFocusProvince ? 'sort-down' : 'sort-up'}
                size={20}
                color={appColors.text1}
              />
            )}
          />
        </View>

        <SpaceComponent height={40} />
        <View>
          <TextComponent
            text="Quận / huyện"
            font={fontFamilies.semiBold}
            size={16}
            styles={{
              color: appColors.text,
              fontFamily: fontFamilies.semiBold,
              fontSize: 14,
              position: 'absolute',
              paddingHorizontal: 4,
              backgroundColor: appColors.white,
              top: -10,
              left: 16,
              zIndex: 9999,
            }}
          />

          <Dropdown
            style={[
              {
                borderColor: appColors.gray,
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 8,
              },
            ]}
            placeholderStyle={{}}
            selectedTextStyle={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}
            inputSearchStyle={{}}
            iconStyle={{}}
            data={dataDistrict}
            search
            maxHeight={300}
            labelField="name"
            valueField="_id"
            placeholder={!isFocusDistrict ? 'Quận / huyện' : '...'}
            searchPlaceholder="Search..."
            value={valueDistrict?._id}
            onFocus={() => setIsFocusDistrict(true)}
            onBlur={() => setIsFocusDistrict(false)}
            onChange={item => {
              setValueDistrict({_id: item._id, name: item.name});
              setIsFocusDistrict(false);
              handleGetDataCommune(item._id);
              setValueCommune();
            }}
            renderRightIcon={() => (
              <FontAwesome6
                name={!isFocusDistrict ? 'sort-down' : 'sort-up'}
                size={20}
                color={appColors.text1}
              />
            )}
          />
        </View>

        <SpaceComponent height={40} />
        <View>
          <TextComponent
            text="Phường / xã"
            font={fontFamilies.semiBold}
            size={16}
            styles={{
              color: appColors.text,
              fontFamily: fontFamilies.semiBold,
              fontSize: 14,
              position: 'absolute',
              paddingHorizontal: 4,
              backgroundColor: appColors.white,
              top: -10,
              left: 16,
              zIndex: 9999,
            }}
          />

          <Dropdown
            style={[
              {
                borderColor: appColors.gray,
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 8,
              },
            ]}
            placeholderStyle={{}}
            selectedTextStyle={{
              fontSize: 14,
              fontFamily: fontFamilies.semiBold,
              color: appColors.text,
            }}
            inputSearchStyle={{}}
            iconStyle={{}}
            data={dataCommune}
            search
            maxHeight={300}
            labelField="name"
            valueField="_id"
            placeholder={!isFocusCommune ? 'Phường / xã' : '...'}
            searchPlaceholder="Search..."
            value={valueCommune?._id}
            onFocus={() => setIsFocusCommune(true)}
            onBlur={() => setIsFocusCommune(false)}
            onChange={item => {
              setValueCommune({_id: item._id, name: item.name});
              setIsFocusCommune(false);
            }}
            renderRightIcon={() => (
              <FontAwesome6
                name={!isFocusCommune ? 'sort-down' : 'sort-up'}
                size={20}
                color={appColors.text1}
              />
            )}
          />
        </View>
      </SectionComponent>

      <SectionComponent
        styles={{
          alignItems: 'center',
          bottom: 0,
          position: 'absolute',
          left: 0,
          right: 0,
        }}>
        <ButtonComponent
          onPress={handleSaveAddress}
          type="primary"
          text="Áp dụng"></ButtonComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SelectAddressScreen;
