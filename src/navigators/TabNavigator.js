/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HistoryScreen,
  HomeScreen,
  NoticeScreen,
  ProfileScreen,
  FavouriteScreen,
  MyBookingScreen,
} from '../screens';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../styles/globalStyles';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../constants/appColors';
import {useDispatch, useSelector} from 'react-redux';
import {fontFamilies} from '../constants/fontFamilies';
import {notificationSelector} from '../redux/reducers/notificationReducer';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const [noti, setNoti] = useState(0);

  const notification = useSelector(notificationSelector);
  console.log('notification: ', notification);

  useEffect(() => {
    setNoti(notification);
  }, [notification]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: 'transparent',
          elevation: 0,
          borderRadius: 15,
          height: 70,
          ...styles.shadow,
        },
        tabBarBackground: () => (
          <LinearGradient
            style={[
              {
                borderRadius: 14,
                flex: 1,
              },
            ]}
            colors={['#2D2D2D', '#275B8B']}
            start={{x: 0.5, y: 0.5}}
            end={{x: 1, y: 1}}
            locations={[0, 1]}></LinearGradient>
        ),
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Octicons
                name="home"
                size={24}
                color={focused ? appColors.white : appColors.gray1}
              />
              {focused && (
                <Text
                  style={{
                    color: appColors.white,
                    marginTop: 6,
                    fontFamily: fontFamilies.semiBold,
                  }}>
                  Home
                </Text>
              )}
            </View>
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Octicons
                name="list-unordered"
                size={24}
                color={focused ? appColors.white : appColors.gray1}
              />
              {focused && (
                <Text
                  style={{
                    color: appColors.white,
                    marginTop: 6,
                    fontFamily: fontFamilies.semiBold,
                  }}>
                  Booking
                </Text>
              )}
            </View>
          ),
        }}
        name="MyBookingScreen"
        component={MyBookingScreen}
      />

      {/* <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Octicons
                name="history"
                size={24}
                color={focused ? appColors.white : appColors.gray1}
              />
              {focused && (
                <Text
                  style={{
                    color: appColors.white,
                    marginTop: 6,
                    fontFamily: fontFamilies.semiBold,
                  }}>
                  History
                </Text>
              )}
            </View>
          ),
        }}
        name="HistoryScreen"
        component={HistoryScreen}
      /> */}

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Octicons
                name="inbox"
                size={24}
                color={focused ? appColors.white : appColors.gray1}
              />
              {noti > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    backgroundColor: appColors.red,
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 10,
                    borderRadius: 50,
                  }}>
                  <Text
                    style={{
                      color: appColors.white,
                    }}>
                    {noti < 10 ? noti : '9+'}
                  </Text>
                </View>
              )}
              {focused && (
                <Text
                  style={{
                    color: appColors.white,
                    marginTop: 6,
                    fontFamily: fontFamilies.semiBold,
                  }}>
                  Notice
                </Text>
              )}
            </View>
          ),
        }}
        name="NoticeScreen"
        component={NoticeScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name="favorite-border"
                size={28}
                color={focused ? appColors.white : appColors.gray1}
              />
              {focused && (
                <Text
                  style={{
                    color: appColors.white,
                    marginTop: 6,
                    fontFamily: fontFamilies.semiBold,
                  }}>
                  Favourite
                </Text>
              )}
            </View>
          ),
        }}
        name="FavouriteScreen"
        component={FavouriteScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Octicons
                name="person"
                size={28}
                color={focused ? appColors.white : appColors.gray1}
              />
              {focused && (
                <Text
                  style={{
                    color: appColors.white,
                    marginTop: 6,
                    fontFamily: fontFamilies.semiBold,
                  }}>
                  Profile
                </Text>
              )}
            </View>
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabNavigator;
