import {View, Text, ImageBackground, StatusBar, Image} from 'react-native';
import React, {useState} from 'react';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {appColors} from '../../constants/appColors';
import {ArrowLeft} from 'iconsax-react-native';
import {RowComponent} from '../../components';
import Swiper from 'react-native-swiper';
import {fontFamilies} from '../../constants/fontFamilies';

const datas = [
  {
    image: require(`../../assets/images/detail-1.png`),
    name: 'Room 1',
  },
  {
    image: require(`../../assets/images/detail-2.png`),
    name: 'Room 2',
  },
  {
    image: require(`../../assets/images/detail-3.png`),
    name: 'Room 3',
  },
  {
    image: require(`../../assets/images/detail-4.png`),
    name: 'Room 4',
  },
  {
    image: require(`../../assets/images/detail-5.png`),
    name: 'Room 5',
  },
  {
    image: require(`../../assets/images/detail-6.png`),
    name: 'Room 6',
  },
];

const FitureScreen = ({navigation}) => {
  const [index, setIndex] = useState(0);
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 0,
          left: 20,
          flex: 1,
          zIndex: 999,
        }}>
        <GestureHandlerRootView style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              marginRight: 12,
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: appColors.gray,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ArrowLeft size={24} color={appColors.white} />
          </TouchableOpacity>
        </GestureHandlerRootView>
      </View>

      <Swiper
        onIndexChanged={num => setIndex(num)}
        index={index}
        style={{}}
        dotColor='transparent'
        activeDotColor='transparent'
        loop={false}>
        {datas.map(data => (
          <ImageBackground
            key={data.image}
            className="flex-1 w-full h-full"
            style={{resizeMode: 'cover'}}
            source={data.image}>
            <Text
              style={{
                position: 'absolute',
                top: 100,
                width: '100%',
                textAlign: 'center',
                color: appColors.white,
                fontFamily: fontFamilies.semiBold,
                fontSize: 16,
              }}>
              {data.name}
            </Text>
          </ImageBackground>
        ))}
      </Swiper>
    </View>
  );
};

export default FitureScreen;
