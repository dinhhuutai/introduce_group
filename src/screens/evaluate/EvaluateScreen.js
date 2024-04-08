import {View, Text, StatusBar, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';
import {useNavigation, useRoute} from '@react-navigation/native';
import Item from './components/Item';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import commentAPI from '../../apis/commentApi';

const EvaluateScreen = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [value, setValue] = useState();
  const [dataRoomType, setDataRoomType] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const navigation = useNavigation();

  const route = useRoute();
  const {id, lengthComment, rating} = route.params;

  useEffect(() => {
    getData();
  }, [id, value]);

  const getData = async () => {
    const res = await commentAPI.HandleComment(
      `/getByIdHotelandIdRoom`,
      {idHotel: id, idRoom: value || 0, limit: page * 5},
      'post',
    );

    setDataRoomType([{_id: 0, name: 'Tất cả'}, ...res.data.allRoom]);
    setData(res.data.comments);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <ContainerComponent back title="Đánh giá & Nhận xét">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <SpaceComponent height={20} />
      <SectionComponent>
        <RowComponent styles={{alignItems: 'center'}}>
          <TextComponent text={rating} font={fontFamilies.semiBold} size={34} />
          <SpaceComponent width={12} />
          <View>
            <TextComponent
              text="Tuyệt vời"
              font={fontFamilies.semiBold}
              size={16}
            />

            <TextComponent
              text={`${lengthComment
                ?.toLocaleString('en-US')
                .replace(/,/g, '.')} đánh giá`}
              font={fontFamilies.medium}
              size={16}
              color={appColors.text1}
            />
          </View>
        </RowComponent>

        <View
          style={{
            marginTop: 16,
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
          }}
        />

        <Dropdown
          style={{
            borderWidth: 1,
            borderColor: appColors.gray,
            borderRadius: 10,
            paddingHorizontal: 16,
            marginTop: 10,
          }}
          placeholderStyle={{}}
          selectedTextStyle={{
            fontSize: 14,
            fontFamily: fontFamilies.semiBold,
            color: appColors.text,
          }}
          inputSearchStyle={{}}
          iconStyle={{}}
          data={dataRoomType}
          search
          maxHeight={300}
          labelField="name"
          valueField="_id"
          placeholder={!isFocus ? 'Tất cả' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setPage(0);
            setValue(item._id);
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

      <View style={{flex: 1, paddingHorizontal: 16}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item?._id.toString()}
          onEndReached={getData}
          onEndReachedThreshold={0.1}
        />
      </View>
    </ContainerComponent>
  );
};

export default EvaluateScreen;
