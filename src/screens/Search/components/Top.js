import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import Octicons from 'react-native-vector-icons/Octicons';
import {appColors} from '../../../constants/appColors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {useSelector} from 'react-redux';
import {searchSelector} from '../../../redux/reducers/searchReducer';

const Top = () => {
  const [dataSearch, setDataSearch] = useState();
  const search = useSelector(searchSelector);

  useEffect(() => {
    setDataSearch(search);
  }, []);


  return (
    <>
      <SpaceComponent height={16} />

      <SectionComponent styles={{marginBottom: -24}}>
        <SectionComponent>
          <RowComponent>
            <Octicons name="location" size={18} color={appColors.text} />

            <SpaceComponent width={8} />

            <TextComponent
              text={`${
                dataSearch?.searchAddress?.commune?.name
                  ? dataSearch?.searchAddress?.commune?.name
                  : ''
              }${dataSearch?.searchAddress?.commune?.name ? ',' : ''} ${
                dataSearch?.searchAddress?.district?.name
                  ? dataSearch?.searchAddress?.district?.name
                  : ''
              }${dataSearch?.searchAddress?.district?.name ? ',' : ''} ${
                dataSearch?.searchAddress?.province?.name
              }`}
              font={fontFamilies.semiBold}
              color={appColors.text}
            />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent>
            <Octicons name="calendar" size={18} color={appColors.text} />

            <SpaceComponent width={8} />

            <TextComponent
              text={`${
                dataSearch?.searchDate?.startDate.d
                  ? `${
                      dataSearch?.searchDate?.startDate.d < 10
                        ? '0' + dataSearch?.searchDate?.startDate.d
                        : dataSearch?.searchDate?.startDate.d
                    }/${
                      dataSearch?.searchDate?.startDate.m < 10
                        ? '0' + dataSearch?.searchDate?.startDate.m
                        : dataSearch?.searchDate?.startDate.m
                    }/${dataSearch?.searchDate?.startDate.y} - ${
                      dataSearch?.searchDate?.endDate.d < 10
                        ? '0' + dataSearch?.searchDate?.endDate.d
                        : dataSearch?.searchDate?.endDate.d
                    }/${
                      dataSearch?.searchDate?.endDate.m < 10
                        ? '0' + dataSearch?.searchDate?.endDate.m
                        : dataSearch?.searchDate?.endDate.m
                    }/${dataSearch?.searchDate?.endDate.y}`
                  : ''
              }`}
              font={fontFamilies.semiBold}
              color={appColors.text}
            />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent>
            <Octicons name="person" size={18} color={appColors.text} />

            <SpaceComponent width={8} />

            <TextComponent
              text={`${dataSearch?.searchQuantityPerson?.adult} adult - ${dataSearch?.searchQuantityPerson?.kid} kid`}
              font={fontFamilies.semiBold}
              color={appColors.text}
            />
          </RowComponent>
        </SectionComponent>
      </SectionComponent>

      <SectionComponent>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.text,
          }}></View>
      </SectionComponent>
    </>
  );
};

export default Top;
