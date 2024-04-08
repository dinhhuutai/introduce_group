import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ContainerComponent} from '../../components';
import Top from './component/Top';
import Bottom from './component/Bottom';
import { useSelector } from 'react-redux';
import { bookingSelector } from '../../redux/reducers/bookingReducer';

const SelectDateScreen = () => {
  const [selectDate, setSelectDate] = useState();


  useEffect(() => {
    today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 2);

    setSelectDate({
      startDate: {
        d: today.getDate(),
        m: today.getMonth() + 1,
        y: today.getFullYear(),
      },
      endDate: {
        d: tomorrow.getDate(),
        m: tomorrow.getMonth() + 1,
        y: tomorrow.getFullYear(),
      },
    });
  }, []);

  return (
    <ContainerComponent back title='Date'>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Top selectDate={selectDate} />
      <Bottom setSelectDate={setSelectDate} selectDate={selectDate} />
    </ContainerComponent>
  );
};

export default SelectDateScreen;
