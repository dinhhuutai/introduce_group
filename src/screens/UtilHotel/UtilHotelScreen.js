import {View} from 'react-native';
import React from 'react';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useRoute} from '@react-navigation/native';

const UtilHotelScreen = ({}) => {
  const route = useRoute();
  const {utils} = route.params;

  return (
    <ContainerComponent back isScroll title="Tiện ích khách sạn">
      <SpaceComponent height={30} />
      <SectionComponent>
        <RowComponent justify="center" styles={{flexWrap: 'wrap', gap: 10}}>
          {utils?.map((util, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                height: 80,
                width: 80,
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: appColors.gray1,
                borderRadius: 10,
                paddingHorizontal: 4,
                paddingVertical: 4,
              }}>
              {util.icon === 'wifi' ? (
                <Feather name={util.icon} size={24} color={appColors.text} />
              ) : util.icon === 'chair-alt' ? (
                <MaterialIcons
                  name={util.icon}
                  size={24}
                  color={appColors.text}
                />
              ) : util.icon === 'elevator' ? (
                <Foundation name={util.icon} size={24} color={appColors.text} />
              ) : util.icon === 'bathtub-outline' ||
                util.icon === 'iron-outline' ||
                util.icon === 'hair-dryer-outline' ||
                util.icon === 'pool' ||
                util.icon === 'fridge-outline' ? (
                <MaterialCommunityIcons
                  name={util.icon}
                  size={24}
                  color={appColors.text}
                />
              ) : util.icon === 'television' ? (
                <FontAwesome
                  name={util.icon}
                  size={24}
                  color={appColors.text}
                />
              ) : util.icon === 'restaurant-outline' ||
                util.icon === 'cafe-outline' ? (
                <Ionicons name={util.icon} size={24} color={appColors.text} />
              ) : util.icon === 'kitchen-set' ? (
                <FontAwesome6
                  name={util.icon}
                  size={24}
                  color={appColors.text}
                />
              ) : (
                ''
              )}
              <SpaceComponent height={8} />
              <TextComponent
                text={util.name}
                size={12}
                font={fontFamilies.semiBold}
                styles={{textAlign: 'center'}}
              />
            </View>
          ))}
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default UtilHotelScreen;
