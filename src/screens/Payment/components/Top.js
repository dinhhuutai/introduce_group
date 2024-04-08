import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {Add} from 'iconsax-react-native';
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import CardDebit from '../../../components/CardDebit';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {userSelector} from '../../../redux/reducers/userReducer';

const Top = () => {
  const navigation = useNavigation();
  const user = useSelector(userSelector);

  return (
    <>
      <SpaceComponent height={20} />

      <SectionComponent>
        <TextComponent
          text="Your debit card"
          size={16}
          font={fontFamilies.semiBold}
        />
        <SpaceComponent height={20} />

        {user?.payments?.length > 0 ? (
          <CardDebit
            number={user?.payments[0]?.numCard}
            name={user?.payments[0]?.name}
            exp={`${
              new Date(user?.payments[0]?.exp).getMonth() + 1 < 10
                ? '0' + (new Date(user?.payments[0]?.exp).getMonth() + 1)
                : new Date(user?.payments[0]?.exp).getMonth() + 1
            }/${new Date(user?.payments[0]?.exp)
              .getFullYear()
              .toString()
              .slice(-2)}`}
          />
        ) : (
          ''
        )}
      </SectionComponent>

      <SpaceComponent height={20} />
    </>
  );
};

export default Top;
