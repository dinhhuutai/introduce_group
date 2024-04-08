import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ContainerComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import Item from './components/Item';
import formatDate from '../../../utils/formatDate';
import notNotice from '../../../assets/images/notNotice.png';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';

const dataRes = [
  {
    _id: 1,
    status: 0,
    statusNotice: 1,
    title: 'Payment Successful',
    content: 'Estabeez Hotel booking was successful',
    createDate: new Date(2024, 3, 6),
  },
  {
    _id: 2,
    status: 0,
    statusNotice: 0,
    title: 'Hotel Booking Canceled',
    content: 'You have canceled Ehiz hotel booking',
    createDate: new Date(2024, 3, 5),
  },
  {
    _id: 3,
    status: 0,
    statusNotice: 0,
    title: 'Hotel Booking Canceled',
    content: 'You have canceled Ehiz hotel booking',
    createDate: new Date(2024, 3, 5),
  },
  {
    _id: 4,
    status: 0,
    statusNotice: 1,
    title: 'Payment Successful',
    content: 'Estabeez Hotel booking was successful',
    createDate: new Date(2024, 3, 4),
  },
  {
    _id: 5,
    status: 0,
    statusNotice: 1,
    title: 'Payment Successful',
    content: 'Estabeez Hotel booking was successful',
    createDate: new Date(2024, 3, 3),
  },
  {
    _id: 6,
    status: 0,
    statusNotice: 0,
    title: 'Hotel Booking Canceled',
    content: 'You have canceled Ehiz hotel booking',
    createDate: new Date(2024, 3, 3),
  },
];

const NoticeScreen = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const groupedData = dataRes.reduce((acc, item) => {
      const key = `${item.createDate.getDate()}/${
        item.createDate.getMonth() + 1
      }/${item.createDate.getFullYear()}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
    const groupedArray = Object.keys(groupedData).map(key => {
      const dateParts = key.split('/');
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);
      const currentDate = new Date();
      const today = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      const yesterday = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1,
      );

      const displayDate =
        day === today.getDate() &&
        month === today.getMonth() + 1 &&
        year === today.getFullYear()
          ? 'Today'
          : day === yesterday.getDate() &&
            month === yesterday.getMonth() + 1 &&
            year === yesterday.getFullYear()
          ? 'Yesterday'
          : formatDate(new Date(year, month - 1, day));

      return {
        date: displayDate,
        items: groupedData[key],
      };
    });

    setDatas(groupedArray);
  };

  return (
    <ContainerComponent isScroll>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SpaceComponent height={40} />
      <RowComponent justify="center">
        <TextComponent text="Notification" title />
      </RowComponent>

      <View style={{paddingHorizontal: 16, paddingBottom: 110}}>
        {datas.length === 0 ? (
          <View style={{marginTop: 100, alignItems: 'center'}}>
            <Image style={{width: 200, height: 200}} source={notNotice} />
            <Text
              style={{
                fontSize: 16,
                color: appColors.text1,
                fontFamily: fontFamilies.semiBold,
              }}>
              No Notification
            </Text>
          </View>
        ) : (
          datas?.map((data, index) => <Item data={data} key={index} />)
        )}
      </View>
    </ContainerComponent>
  );
};

export default NoticeScreen;
