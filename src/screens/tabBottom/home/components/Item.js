import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../../components';
import {appColors} from '../../../../constants/appColors';
import Card from './Card';
import {useNavigation} from '@react-navigation/native';

const Item = ({title, data, url, idUser}) => {
  const navigation = useNavigation();
  return (
    <ContainerComponent>
      <SpaceComponent height={30} />
      <SectionComponent>
        <RowComponent justify="space-between">
          <TextComponent text={title} title size={20} />
          <ButtonComponent
            onPress={() =>
              navigation.navigate('ListHotelScreen', {title, url, idUser})
            }
            text="see more"
            styles={{fontSize: 14}}
            textColor={appColors.primary}
          />
        </RowComponent>
      </SectionComponent>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <SectionComponent>
          <RowComponent styles={{gap: 16}}>
            {data?.map(item => (
              <Card data={item} key={item._id} />
            ))}
          </RowComponent>
        </SectionComponent>
      </ScrollView>
    </ContainerComponent>
  );
};

export default Item;
