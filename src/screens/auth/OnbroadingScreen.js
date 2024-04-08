import {
  Image,
  ImageBackground,
  Text,
  StatusBar,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ButtonComponent, SectionComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';

const OnbroadingScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg-boarding.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" />
        <View className="mt-[51px] flex items-center">
          <Image source={require('../../assets/images/logo.png')} />
        </View>
        <View style={{marginHorizontal: 40, marginTop: 100}}>
          <Text
            className="text-[24px]"
            style={{
              fontFamily: fontFamilies.semiBold,
              color: appColors.white,
              lineHeight: 36,
            }}>
            Welcome to <Text style={{color: '#27A4F2'}}>Ocean</Text>
            <Text style={{color: '#222222'}}>Stay</Text> - Book Your Dream Stay
            with One Tap...
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{color: '#fff', fontSize: 16}}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnbroadingScreen;
