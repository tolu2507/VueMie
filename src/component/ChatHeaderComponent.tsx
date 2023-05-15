/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Pressable} from 'react-native';
import style from '../common/stlye';
import {Image} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import User from '../common/User';
import {Button} from './Button';
import {background, white} from './images';
import {USER} from '../services/UserService';

const ChatHeaderComponent = ({
  mode,
  navigation,
  borderColor,
  setSelected,
  backgroundColor,
  user,
  data,
  res,
  setBool,
  setMode,
}: HeaderDetailsComponent) => {
  const {innerView, icon, image, users, button} = style.chat;
  const handleClick: () => void = () => {
    setSelected([]);
    navigation.navigate('Users', {res: user, data: data});
  };
  const handleProfileClick: () => void = () =>
    console.log('this is the profile details, thou you are coding');

  return (
    <View style={[innerView, {backgroundColor: backgroundColor}]}>
      <Pressable
        onPress={handleClick}
        style={icon}
        android_ripple={{color: '#FFFFFF'}}>
        <Icons name={'arrow-back-circle-sharp'} size={20} color={'white'} />
        <Image
          source={{uri: res.image}}
          style={[image, {borderColor: borderColor}]}
        />
      </Pressable>
      <User
        name={res.name}
        onPress={handleProfileClick}
        style={users}
        color={'white'}
      />
      <Button
        icon={<Icons name={'reorder-three-sharp'} size={35} color={'white'} />}
        onPress={() => {
          setBool(true);
          setMode(mode === white ? background : white);
        }}
        style={button}
      />
    </View>
  );
};

export default ChatHeaderComponent;

export interface HeaderDetailsComponent {
  mode: string;
  navigation: any;
  borderColor: string;
  setSelected: (val: []) => any;
  backgroundColor: string;
  user: USER;
  data: USER[];
  res: USER;
  setBool: (vals: boolean) => void;
  setMode: (val: string) => void;
}
