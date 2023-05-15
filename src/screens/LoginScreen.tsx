/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {Login} from '../component/Login';
import {NotificationController} from '../services/Pushnotification';
import {CONSTANT} from '../common/constant';

const LoginScreen = ({navigation}: any) => {
  const {CHANNEL} = CONSTANT;
  useEffect(() => {
    return () =>
      NotificationController({
        channelname: CHANNEL,
        channelid: CHANNEL,
        channeldescription: 'This is a new way of using my app',
      });
  });

  return <Login navigation={navigation} channel={CHANNEL} />;
};

export default LoginScreen;
