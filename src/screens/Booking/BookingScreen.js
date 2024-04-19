import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import distanceTwoDay from '../../utils/distanceTwoDay';
import {Mastercard, Paypal, Visa} from '../../assets/svgs';
import {useRoute} from '@react-navigation/native';
import roomAPI from '../../apis/roomApi';
import {useDispatch, useSelector} from 'react-redux';
import {searchSelector} from '../../redux/reducers/searchReducer';
import {userSelector} from '../../redux/reducers/userReducer';
import {addPhone, bookingSelector} from '../../redux/reducers/bookingReducer';
import Fontisto from 'react-native-vector-icons/Fontisto';
import paymentAPI from '../../apis/paymentApi';
import paypalApi from '../../apis/paypalApi';
import WebView from 'react-native-webview';
import queryString from 'query-string';
import bookingAPI from '../../apis/bookingApi';
import {LoadingModal} from '../../modals';
import notiAPI from '../../apis/notiApi';
import {changeMyBooking} from '../../redux/reducers/myBookingReducer';
import {changeNotification} from '../../redux/reducers/notificationReducer';

const BookingScreen = ({navigation}) => {
  const [dataRoom, setDataRoom] = useState();
  const [price, setPrice] = useState();
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [webViewLoaded, setWebViewLoaded] = useState(false);

  const route = useRoute();
  const {id} = route.params;

  const dispatch = useDispatch();

  const search = useSelector(searchSelector);
  const user = useSelector(userSelector);
  const booking = useSelector(bookingSelector);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    const res = await roomAPI.HandleRoom(`/getById/${id}`);

    if (res.success) {
      setDataRoom(res.data);

      const priceTemp =
        res.data?.price *
        distanceTwoDay(
          search?.searchDate?.startDate.d,
          search?.searchDate?.startDate.m,
          search?.searchDate?.startDate.y,
          search?.searchDate?.endDate.d,
          search?.searchDate?.endDate.m,
          search?.searchDate?.endDate.y,
        );

      setPrice(priceTemp);
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      if (booking.methodPayment === 'hotel') {
        const data = {
          idUser: user._id,
          checkIn: new Date(
            search?.searchDate?.startDate.y,
            search?.searchDate?.startDate.m - 1,
            search?.searchDate?.startDate.d,
            14,
            0,
            0,
          ),
          checkOut: new Date(
            search?.searchDate?.endDate.y,
            search?.searchDate?.endDate.m - 1,
            search?.searchDate?.endDate.d,
            12,
            0,
            0,
          ),
          phone: booking.phone,
          price,
          idHotel: dataRoom.idHotel._id,
          idRoom: dataRoom._id,
          methodPayment: booking.methodPayment,
          people: {
            adult: search.searchQuantityPerson.adult,
            kid: search.searchQuantityPerson.kid,
          },
          isPaid: false,
          status: 1,
          statusContent: '',
        };
        console.log(data);

        const resBooking = await bookingAPI.HandleBooking(
          '/create',
          data,
          'post',
        );

        if (resBooking.success) {
          const dataNoti = {
            status: 0,
            idUser: user._id,
            statusNotice: 1,
            statusBooking: 1,
            nameHotel: dataRoom?.idHotel?.name,
          };
          await notiAPI.HandleNoti(`/create`, dataNoti, 'post');

          dispatch(changeMyBooking(resBooking.data));

          clearPaypalState();
          setLoading(false);
          navigation.navigate('BookingSuccessScreen', {
            booking: {
              name: dataRoom?.idHotel?.name,
              address: `${dataRoom?.idHotel?.district?.name}, ${dataRoom?.idHotel?.province?.name}`,
              numNight: `${distanceTwoDay(
                search?.searchDate?.startDate.d,
                search?.searchDate?.startDate.m,
                search?.searchDate?.startDate.y,
                search?.searchDate?.endDate.d,
                search?.searchDate?.endDate.m,
                search?.searchDate?.endDate.y,
              )}`,
              price: price,
            },
          });
        }
      } else if (booking.methodPayment === 'paypal') {
        handleBookingPaypal();
      } else {
        navigation.navigate('BookingCancelScreen', {
          methodPayment: booking.methodPayment,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleBookingPaypal = async () => {
    setLoading(true);

    let orderDetail = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          items: [
            {
              name: `${dataRoom?.idHotel?.name}`,
              quantity: '1',
              unit_amount: {
                currency_code: 'USD',
                value: `${price}.00`,
              },
            },
          ],
          amount: {
            currency_code: 'USD',
            value: `${price}.00`,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: `${price}.00`,
              },
            },
          },
        },
      ],
      application_context: {
        return_url: 'https://example.com/return',
        cancel_url: 'https://example.com/cancel',
      },
    };

    try {
      const token = await paypalApi.generateToken();
      const res = await paypalApi.createOrder(token, orderDetail);

      console.log('res++++++', res);
      setAccessToken(token);
      setLoading(false);
      if (!!res?.links) {
        const findUrl = res.links.find(data => data?.rel == 'approve');
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      clearPaypalState();
      navigation.navigate('BookingCancelScreen', {
        methodPayment: booking.methodPayment,
      });
    }
  };

  const onUrlChange = webviewState => {
    console.log('webviewStatewebviewState', webviewState);
    if (webviewState.url.includes('https://example.com/cancel')) {
      console.log('12345678');
      clearPaypalState();
      navigation.navigate('BookingCancelScreen', {
        methodPayment: booking.methodPayment,
      });
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      if (!webViewLoaded) {
        setWebViewLoaded(true);
        return;
      }

      const urlValues = queryString.parseUrl(webviewState.url);
      console.log('my urls value', urlValues);
      const {token} = urlValues.query;
      if (!!token) {
        paymentSucess(token);
      }
    }
  };

  const paymentSucess = async id => {
    console.log('payment');
    setLoading(true);
    try {
      const res = await paypalApi.capturePayment(id, accessToken);
      console.log('capturePayment res++++', res);

      const data = {
        idUser: user._id,
        checkIn: new Date(
          search?.searchDate?.startDate.y,
          search?.searchDate?.startDate.m - 1,
          search?.searchDate?.startDate.d,
          14,
          0,
          0,
        ),
        checkOut: new Date(
          search?.searchDate?.endDate.y,
          search?.searchDate?.endDate.m - 1,
          search?.searchDate?.endDate.d,
          12,
          0,
          0,
        ),
        phone: booking.phone,
        price,
        idHotel: dataRoom.idHotel._id,
        idRoom: dataRoom._id,
        methodPayment: booking.methodPayment,
        people: {
          adult: search.searchQuantityPerson.adult,
          kid: search.searchQuantityPerson.kid,
        },
        isPaid: true,
        status: 1,
        statusContent: '',
      };
      console.log(data);

      const resBooking = await bookingAPI.HandleBooking(
        '/create',
        data,
        'post',
      );

      console.log(resBooking);

      if (resBooking.success) {
        const dataNoti = {
          status: 0,
          idUser: user._id,
          statusNotice: 1,
          statusBooking: 1,
          nameHotel: dataRoom?.idHotel?.name,
        };
        const resNoti = await notiAPI.HandleNoti(`/create`, dataNoti, 'post');

        dispatch(changeNotification(resNoti.data));
        console.log(resNoti.data);

        clearPaypalState();
        setLoading(false);
        navigation.navigate('BookingSuccessScreen', {
          booking: {
            name: dataRoom?.idHotel?.name,
            address: `${dataRoom?.idHotel?.district?.name}, ${dataRoom?.idHotel?.province?.name}`,
            numNight: `${distanceTwoDay(
              search?.searchDate?.startDate.d,
              search?.searchDate?.startDate.m,
              search?.searchDate?.startDate.y,
              search?.searchDate?.endDate.d,
              search?.searchDate?.endDate.m,
              search?.searchDate?.endDate.y,
            )}`,
            price: price,
          },
        });
      }
    } catch (error) {
      setLoading(false);
      console.log('error raised in payment capture', error);
      clearPaypalState();
      navigation.navigate('BookingCancelScreen', {
        methodPayment: booking.methodPayment,
      });
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return (
    <ContainerComponent back isScroll title="Booking detail">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <SpaceComponent height={6} />

      <SectionComponent>
        <TextComponent
          text="Thông tin đặt phòng"
          size={16}
          font={fontFamilies.semiBold}
        />

        <SpaceComponent height={20} />
        <View>
          <RowComponent styles={{gap: 14}}>
            <Image
              style={{
                height: 90,
                width: 120,
                resizeMode: 'cover',
                objectFit: 'cover',
                borderRadius: 10,
              }}
              source={require('../../assets/images/detail-1.png')}
            />

            <View
              style={{
                height: '100%',
                width: '70%',
              }}>
              <View>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 16,
                    fontFamily: fontFamilies.semiBold,
                    color: appColors.text,
                  }}>
                  {dataRoom?.idHotel?.name}
                </Text>
                <SpaceComponent height={4} />
                <RowComponent>
                  <TextComponent
                    text={dataRoom?.name}
                    font={fontFamilies.medium}
                    size={14}
                  />
                </RowComponent>
              </View>

              <SpaceComponent height={10} />
              <View>
                <RowComponent>
                  <TextComponent
                    text={
                      search?.searchQuantityPerson.adult
                        ? `${search?.searchQuantityPerson?.adult} adult`
                        : ''
                    }
                    font={fontFamilies.medium}
                    size={14}
                  />
                  {search?.searchQuantityPerson.kid ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Octicons
                        style={{marginHorizontal: 14}}
                        name="dot-fill"
                        size={10}
                        color={appColors.text1}
                      />
                      <TextComponent
                        text={`${search?.searchQuantityPerson?.kid} kid`}
                        font={fontFamilies.medium}
                        size={14}
                      />
                    </View>
                  ) : (
                    ''
                  )}
                </RowComponent>
              </View>

              <SpaceComponent height={10} />
              <TextComponent
                text={`${dataRoom?.idHotel?.district?.name}, ${dataRoom?.idHotel?.province?.name}`}
                font={fontFamilies.medium}
                size={14}
                color={appColors.text1}
              />
            </View>
          </RowComponent>
        </View>
      </SectionComponent>

      <SectionComponent>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
          }}></View>
      </SectionComponent>

      <SectionComponent>
        <RowComponent styles={{gap: 14}}>
          <View
            style={{
              height: 120,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: appColors.gray,
              borderRadius: 10,
            }}>
            <Octicons name="clock" size={24} color={appColors.gray} />
            <SpaceComponent height={8} />
            <Text>{`${distanceTwoDay(
              search?.searchDate?.startDate.d,
              search?.searchDate?.startDate.m,
              search?.searchDate?.startDate.y,
              search?.searchDate?.endDate.d,
              search?.searchDate?.endDate.m,
              search?.searchDate?.endDate.y,
            )} Night`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              gap: 20,
            }}>
            <View>
              <TextComponent
                text="Nhận phòng"
                font={fontFamilies.medium}
                size={15}
              />
              <SpaceComponent height={6} />
              <TextComponent
                text={`${
                  search?.searchDate?.startDate.d < 10
                    ? '0' + search?.searchDate?.startDate.d
                    : search?.searchDate?.startDate.d
                }/${
                  search?.searchDate?.startDate.m < 10
                    ? '0' + search?.searchDate?.startDate.m
                    : search?.searchDate?.startDate.m
                }/${search?.searchDate?.startDate.y}`}
                font={fontFamilies.semiBold}
                size={16}
              />
            </View>

            <View>
              <TextComponent
                text="Trả phòng"
                font={fontFamilies.medium}
                size={15}
              />
              <SpaceComponent height={6} />
              <TextComponent
                text={`${
                  search?.searchDate?.endDate.d < 10
                    ? '0' + search?.searchDate?.endDate.d
                    : search?.searchDate?.endDate.d
                }/${
                  search?.searchDate?.endDate.m < 10
                    ? '0' + search?.searchDate?.endDate.m
                    : c.searchDate?.endDate.m
                }/${search?.searchDate?.endDate.y}`}
                font={fontFamilies.semiBold}
                size={16}
              />
            </View>
          </View>
        </RowComponent>
      </SectionComponent>

      <View
        style={{
          height: 8,
          width: '100%',
          backgroundColor: appColors.gray,
        }}></View>

      <SpaceComponent height={20} />
      <SectionComponent>
        <RowComponent justify="space-between">
          <TextComponent
            text="Thông tin người đặt phòng"
            size={16}
            font={fontFamilies.semiBold}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('VerificationPhoneScreen')}>
            <TextComponent
              text="Thay đổi"
              size={14}
              font={fontFamilies.semiBold}
              color={appColors.primary}
            />
          </TouchableOpacity>
        </RowComponent>

        <SpaceComponent height={20} />
        <RowComponent justify="space-between">
          <TextComponent text="Phone" size={16} font={fontFamilies.medium} />
          <TextComponent
            text={booking?.phone}
            size={16}
            font={fontFamilies.semiBold}
          />
        </RowComponent>
      </SectionComponent>

      <View
        style={{
          height: 8,
          width: '100%',
          backgroundColor: appColors.gray,
        }}></View>

      <SpaceComponent height={20} />
      <SectionComponent>
        <RowComponent justify="space-between">
          <TextComponent
            text="Thanh toán"
            size={16}
            font={fontFamilies.semiBold}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('PaymentScreen')}>
            <TextComponent
              text={booking?.methodPayment ? 'Thay đổi' : 'Chọn phương thức'}
              size={14}
              font={fontFamilies.semiBold}
              color={booking?.methodPayment ? appColors.primary : appColors.red}
            />
          </TouchableOpacity>
        </RowComponent>

        {booking?.methodPayment && (
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              marginTop: 20,
            }}>
            {booking?.methodPayment !== 'hotel' && (
              <Octicons name="credit-card" size={22} color={appColors.text} />
            )}
            {booking?.methodPayment == 'hotel' ? (
              <Fontisto name="hotel" size={20} color={appColors.primary1} />
            ) : booking?.methodPayment == 'mastercard' ? (
              <Mastercard style={{marginLeft: 12}} />
            ) : booking?.methodPayment == 'paypal' ? (
              <Paypal style={{marginLeft: 12}} />
            ) : (
              <Visa style={{marginLeft: 12}} />
            )}

            <TextComponent
              text={
                booking?.methodPayment == 'hotel'
                  ? 'Thanh toán tại khách sạn'
                  : booking?.methodPayment
              }
              font={fontFamilies.semiBold}
              size={14}
            />
          </View>
        )}
      </SectionComponent>

      <View
        style={{
          height: 8,
          width: '100%',
          backgroundColor: appColors.gray,
        }}></View>

      <SpaceComponent height={20} />
      <SectionComponent>
        <RowComponent justify="space-between">
          <TextComponent
            text="Chi tiết thanh toán"
            size={16}
            font={fontFamilies.semiBold}
          />
        </RowComponent>
        <SpaceComponent height={20} />

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
          }}></View>
        <SpaceComponent height={20} />

        <RowComponent justify="space-between">
          <View
            style={{
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <Feather name="dollar-sign" size={20} color={appColors.text} />
            <TextComponent
              text="Tiền phòng"
              size={16}
              font={fontFamilies.medium}
            />
          </View>
          <TextComponent
            text={`${price?.toLocaleString('en-US').replace(/,/g, '.')}.000đ`}
            size={16}
            font={fontFamilies.semiBold}
          />
        </RowComponent>

        <SpaceComponent height={20} />

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
          }}></View>
        <SpaceComponent height={20} />

        <RowComponent justify="space-between">
          <TextComponent
            text="Tổng thanh toán"
            size={18}
            font={fontFamilies.semiBold}
          />
          <TextComponent
            text={`${price?.toLocaleString('en-US').replace(/,/g, '.')}.000đ`}
            size={20}
            font={fontFamilies.semiBold}
          />
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={20} />
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={handleBooking}
          type="primary"
          text="Pay"></ButtonComponent>
      </SectionComponent>

      {isLoading && <LoadingModal />}

      <Modal visible={!!paypalUrl}>
        <TouchableOpacity onPress={clearPaypalState} style={{margin: 24}}>
          <Text>Closed</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <WebView
            source={{uri: paypalUrl}}
            onNavigationStateChange={onUrlChange}
          />
        </View>
      </Modal>
    </ContainerComponent>
  );
};

export default BookingScreen;
