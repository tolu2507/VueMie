/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, ImageBackground} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {background} from './images';
import style from '../common/stlye';
import {
  NotificationController,
  sendPushNotification,
} from '../services/Pushnotification';
import ChatHeaderComponent from './ChatHeaderComponent';
import InputmessageComponent from './InputmessageComponent';
import MessageListComponent, {BlankPage} from './MessageListComponent';
import {USER} from '../services/UserService';

export type Message = {
  id: string;
  texts: string;
  read?: boolean;
  token?: string;
  createdAt: number;
  user: {
    uid: number;
    displayName: string;
  };
};

const ChatScreen = ({route, navigation, database}: any) => {
  const {res, user, data}: {res: USER; user: USER; data: USER[]} = route.params;
  const [messages, setMessages] = useState<Message[] | any[]>([]);
  const [text, setText] = useState<string>('');
  const [ids, setId] = useState<number>(0);
  const [bool, setBool] = useState<boolean>(true);
  const [selected, setSelected] = useState<Message['id'][]>([]);
  const [mode, setMode] = useState(background);

  const {container, view} = style.chat;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(database)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const datas = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (!querySnapshot.empty) {
          setMessages(datas);
        }
      });

    return () => unsubscribe();
  }, [selected, database]);

  useEffect(() => {
    return () =>
      NotificationController({
        channelname: database,
        channelid: database,
        channeldescription: database,
      });
  });

  const onSend = async () => {
    setBool(false);
    let count = ids + 1;
    const createdAt = new Date().getTime();
    setId(count);

    await firebase
      .firestore()
      .collection(database)
      .add({
        texts: text,
        createdAt,
        read: bool,
        user: {
          uid: user.id,
          displayName: user.name,
        },
      });
    setText('');

    return sendPushNotification(text, user.name, database);
  };

  const borderColor = res.name ? '#008000' : 'red';
  let backgroundColor = mode === background ? '#B4BAFF' : '#654EE8';
  let colors = mode === background ? '#654EE8' : '#FFFFFF';
  let updateButtonColor = {
    backgroundColor,
    width: 50,
    height: 50,
    borderRadius: 25,
  };
  let newStyle = {
    flex: 1,
    padding: 10,
    borderRadius: 0,
  };

  return (
    <ImageBackground source={mode} style={container}>
      {res.name && user.name && (
        <View style={view}>
          <ChatHeaderComponent
            mode={mode}
            navigation={navigation}
            borderColor={borderColor}
            setSelected={setSelected}
            backgroundColor={backgroundColor}
            user={user}
            data={data}
            res={res}
            setBool={setBool}
            setMode={setMode}
          />
          <MessageListComponent
            user={user}
            selected={selected}
            setSelected={setSelected}
            messages={messages}
          />
          <InputmessageComponent
            backgroundColor={backgroundColor}
            colors={colors}
            text={text}
            setText={setText}
            onSend={onSend}
            updateButtonColor={updateButtonColor}
          />
        </View>
      )}
      {!res.name && <BlankPage newStyle={newStyle} res={res} />}
    </ImageBackground>
  );
};

export default ChatScreen;
