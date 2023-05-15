/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Pressable, View, Image, ImageSourcePropType} from 'react-native';
import styles from './stlye';

export type Users = {
  name: string;
  icon?: any;
  image?: ImageSourcePropType;
  onPress: () => void;
  style: {};
  color: string;
};

const User = ({
  name,
  icon,
  image,
  onPress,
  style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  color,
}: Users) => {
  const {imageStyle,view} = styles.user;
  return (
    <Pressable onPress={onPress} style={style} android_ripple={{color: color}}>
      <View style={view}>{icon}</View>
      <View style={view}>
        {image && <Image source={image} style={imageStyle} />}
      </View>
      <View>
        <Text style={{fontSize: 22, color: 'black', fontWeight:'600'}}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default User;
