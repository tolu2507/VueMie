/* eslint-disable prettier/prettier */
import React from 'react';
import style from './stlye';
import {View, Text} from 'react-native';

export interface twitter {
  key?: number;
  value: string;
  containerStyle?: {};
  textStyle?: {};
}

const {container, text} = style.twitter;

export const Twitter = ({
  value,
  containerStyle = container,
  textStyle = text,
}: twitter) => {
  return (
    <View style={[containerStyle]}>
      <Text style={[textStyle]}>{value}</Text>
    </View>
  );
};
