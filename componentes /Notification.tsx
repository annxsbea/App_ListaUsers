import React from 'react';
import { ToastAndroid, Platform, Alert } from 'react-native';

interface Props {
  message: string;
}

const Notification: React.FC<Props> = ({ message }) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(message);
  }

  return null;
};

export default Notification;
