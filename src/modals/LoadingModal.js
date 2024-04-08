import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {SpaceComponent, TextComponent} from '../components';
import {appColors} from '../constants/appColors';

const LoadingModal = ({visible, mess}) => {
  return (
    <Modal
      visible={visible}
      style={[{flex: 1}]}
      transparent
      statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={appColors.white} size={32} />
        <SpaceComponent height={20} />
        <TextComponent text="Loading" color={appColors.white} size={16} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
