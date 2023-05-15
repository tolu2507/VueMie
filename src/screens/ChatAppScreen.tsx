/* eslint-disable prettier/prettier */
import React from 'react';
import ChatApp from '../component/ChatApp';
import {USER} from '../services/UserService';

const ChatAppScreen = ({navigation, route}: any) => {
  const {res, user}: {res: USER; user: USER} = route.params;
  let string = res.id + user.id;
  let modifiedString = string.replace(/[0-9]/g, '').toUpperCase();
  let response: string = modifiedString.split('').sort().join('');

  return <ChatApp navigation={navigation} route={route} database={response} />;
};

export default ChatAppScreen;
