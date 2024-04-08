import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import getDaysInMonth from '../../../utils/getDaysInMonth';
import {appColors} from '../../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import milliSeconds from '../../../utils/milliSeconds';
import {useDispatch} from 'react-redux';
import {setDate} from '../../../redux/reducers/searchReducer';
import {useNavigation} from '@react-navigation/native';

const monthText = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysInWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Bottom = ({setSelectDate, selectDate}) => {
  const [dateNow, setDateNow] = useState({d: '', m: '', y: ''});
  const [dateEnd, setDateEnd] = useState({d: '', m: '', y: ''});
  const [currentDate, setCurrentDate] = useState({d: '', m: '', y: ''});
  const [daysInMonth, setDaysInMonth] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    date = new Date();

    setDateNow({
      d: date.getDate(),
      m: date.getMonth() + 1,
      y: date.getFullYear(),
    });

    setCurrentDate({
      d: date.getDate(),
      m: date.getMonth() + 1,
      y: date.getFullYear(),
    });

    setDateEnd({
      d: date.getDate(),
      m: date.getMonth() + 1,
      y: date.getFullYear() + 1,
    });

    createDaysInMonth(date.getMonth() + 1, date.getFullYear());
  }, []);

  useEffect(() => {
    createDaysInMonth(currentDate.m, currentDate.y);
  }, [currentDate]);

  const createDaysInMonth = (month, year) => {
    const currentDate = new Date(year, month - 1, 1);
    const firstDayOfWeek = currentDate.getDay();

    var temp = [];
    for (var i = 1; i <= firstDayOfWeek; i++) {
      let dayInMonth = {};
      temp = [...temp, dayInMonth];
    }

    var length = getDaysInMonth(month, year);
    for (var i = 1; i <= length; i++) {
      let dayInMonth = {
        d: i,
        m: month,
        y: year,
      };
      temp = [...temp, dayInMonth];
    }
    setDaysInMonth(temp);
  };

  const handlePrevMonth = () => {
    if (!(currentDate.m === dateNow.m && currentDate.y === dateNow.y)) {
      setCurrentDate({
        d: date.getDate(),
        m: currentDate.m === 1 ? 12 : currentDate.m - 1,
        y: currentDate.m === 1 ? currentDate.y - 1 : currentDate.y,
      });
    }
  };

  const handleNextMonth = () => {
    if (!(currentDate.m === dateEnd.m && currentDate.y === dateEnd.y)) {
      setCurrentDate({
        d: date.getDate(),
        m: currentDate.m === 12 ? 1 : currentDate.m + 1,
        y: currentDate.m === 12 ? currentDate.y + 1 : currentDate.y,
      });
    }
  };

  const handleSelectDate = date => {
    if (!(date.d < dateNow.d && date.m === dateNow.m && date.y === dateNow.y)) {
      if (
        selectDate.startDate.d &&
        !selectDate.endDate.d &&
        date.y >= selectDate.startDate.y &&
        (date.m >= selectDate.startDate.m ||
          (date.m < selectDate.startDate.m &&
            date.y > selectDate.startDate.y)) &&
        (date.d > selectDate.startDate.d ||
          (date.d <= selectDate.startDate.d && date.m > selectDate.startDate.m))
      ) {
        const dateTemp = {
          ...selectDate,
          endDate: date,
        };

        setSelectDate(dateTemp);
      } else {
        const dateTemp = {
          startDate: date,
          endDate: {
            d: '',
            m: '',
            y: '',
          },
        };

        setSelectDate(dateTemp);
      }
    }
  };

  const handleSaveDate = async () => {
    if (selectDate.startDate.d && selectDate.endDate.d) {
      dispatch(setDate(selectDate));
      navigation.goBack();
    }
  };

  return (
    <>
      <SpaceComponent height={20} />
      <RowComponent justify="center" styles={{gap: 46}}>
        {currentDate.m === dateNow.m && currentDate.y === dateNow.y ? (
          <Octicons
            name="chevron-left"
            size={24}
            color={
              currentDate.m === dateNow.m && currentDate.y === dateNow.y
                ? appColors.text1
                : appColors.text
            }
          />
        ) : (
          <TouchableOpacity onPress={() => handlePrevMonth()}>
            <Octicons
              name="chevron-left"
              size={24}
              color={
                currentDate.m === dateNow.m && currentDate.y === dateNow.y
                  ? appColors.text1
                  : appColors.text
              }
            />
          </TouchableOpacity>
        )}
        <TextComponent
          text={`${monthText[currentDate.m - 1]}, ${currentDate.y}`}
          size={16}
          font={fontFamilies.medium}
        />
        {currentDate.m === dateEnd.m && currentDate.y === dateEnd.y ? (
          <Octicons
            name="chevron-right"
            size={24}
            color={
              currentDate.m === dateEnd.m && currentDate.y === dateEnd.y
                ? appColors.text1
                : appColors.text
            }
          />
        ) : (
          <TouchableOpacity onPress={() => handleNextMonth()}>
            <Octicons
              name="chevron-right"
              size={24}
              color={
                currentDate.m === dateEnd.m && currentDate.y === dateEnd.y
                  ? appColors.text1
                  : appColors.text
              }
            />
          </TouchableOpacity>
        )}
      </RowComponent>

      <SectionComponent>
        <RowComponent justify="space-around">
          {daysInWeek.map((day, index) => (
            <View key={index}>
              <TextComponent
                styles={{flex: 1, textAlign: 'center'}}
                text={day}
                font={fontFamilies.bold}
                size={16}
              />
            </View>
          ))}
        </RowComponent>
        <SpaceComponent height={10} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {daysInMonth &&
            daysInMonth.map((day, index) => (
              <View
                key={index}
                style={{
                  width: '14.285%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text
                  onPress={() => handleSelectDate(day)}
                  style={{
                    fontSize: 16,
                    fontFamily: fontFamilies.semiBold,
                    color:
                      day.d < dateNow.d &&
                      day.m === dateNow.m &&
                      day.y === dateNow.y
                        ? appColors.text1
                        : (milliSeconds(
                            selectDate.startDate.d,
                            selectDate.startDate.m,
                            selectDate.startDate.m,
                          ) <= milliSeconds(day.d, day.m, day.m) &&
                            milliSeconds(
                              selectDate.endDate.d,
                              selectDate.endDate.m,
                              selectDate.endDate.m,
                            ) >= milliSeconds(day.d, day.m, day.m)) ||
                          (day.y === selectDate.startDate.y &&
                            day.m === selectDate.startDate.m &&
                            day.d === selectDate.startDate.d)
                        ? appColors.white
                        : appColors.text,
                    minWidth: 46,
                    textAlign: 'center',
                    paddingVertical: 14,
                    borderRadius: 50,
                    backgroundColor:
                      day.y === selectDate.startDate.y &&
                      day.m === selectDate.startDate.m &&
                      day.d === selectDate.startDate.d
                        ? appColors.green
                        : day.y === selectDate.endDate.y &&
                          day.m === selectDate.endDate.m &&
                          day.d === selectDate.endDate.d
                        ? appColors.red
                        : milliSeconds(
                            selectDate.startDate.d,
                            selectDate.startDate.m,
                            selectDate.startDate.m,
                          ) < milliSeconds(day.d, day.m, day.m) &&
                          milliSeconds(
                            selectDate.endDate.d,
                            selectDate.endDate.m,
                            selectDate.endDate.m,
                          ) > milliSeconds(day.d, day.m, day.m)
                        ? appColors.primary
                        : 'transparent',
                  }}>
                  {day.d}
                </Text>
              </View>
            ))}
        </View>
      </SectionComponent>

      <SpaceComponent height={10} />

      <SectionComponent
        styles={{
          alignItems: 'center',
          bottom: 0,
          position: 'absolute',
          left: 0,
          right: 0,
        }}>
        <ButtonComponent
          onPress={handleSaveDate}
          type="primary"
          text="Áp dụng"></ButtonComponent>
      </SectionComponent>
    </>
  );
};

export default Bottom;
