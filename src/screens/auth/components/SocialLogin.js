import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {Apple, Facebook, Google} from '../../../assets/svgs';
import {fontFamilies} from '../../../constants/fontFamilies';

const SocialLogin = () => {
  return (
    <SectionComponent>
      <View
        style={{
          position: 'relative',
          backgroundColor: appColors.text1,
          height: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          className="absolute px-[12px] translate-y-[-2px]"
          style={{color: appColors.text1, backgroundColor: appColors.white}}>
          Or sign up with
        </Text>
      </View>

      <SpaceComponent height={30} />

      <RowComponent justify='space-between'>
        <TouchableOpacity
          style={{
            width: 98,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            borderColor: appColors.text1,
            borderWidth: 1,
          }}>
          <Google />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            width: 98,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            borderColor: appColors.text1,
            borderWidth: 1,
          }}>
          <Facebook />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            width: 98,
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            borderColor: appColors.text1,
            borderWidth: 1,
          }}>
          <Apple />
        </TouchableOpacity>
      </RowComponent>
    </SectionComponent>
  );
};

export default SocialLogin;
