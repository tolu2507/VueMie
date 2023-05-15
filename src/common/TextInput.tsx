/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TextInput, KeyboardTypeOptions} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {Button} from '../component/Button';
import style from './stlye';

const {
  container,
  textview,
  inputstyle,
  validatestyleerror,
  validatestylemark,
  validatetext,
} = style.textinput;

export interface Task {
  key?: number;
  placeholder: string;
  value: string;
  onChangeText: any;
  secureTextEntry: boolean;
  styles?: {} | undefined;
  validate: null | undefined | boolean;
  icon: any;
  text: string;
  keyboardType?: KeyboardTypeOptions | undefined;
}

export interface FOOTER {
  navigation?: any;
  text: string;
  viewstyle: {};
  textstyle: {};
  buttonstyle: {};
  navigationpage?: string;
  buttontext: string;
  press: () => any;
}

export const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  styles = inputstyle,
  validate,
  icon,
  text,
  keyboardType = 'default',
}: Task) => {
  return (
    <View style={[container]}>
      <View style={[textview]}>
        <View>{icon}</View>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          style={[styles]}
          keyboardType={keyboardType}
        />
        {validate === false ? (
          <View style={[validatestyleerror]}>
            <Icons name={'close'} size={35} color={'white'} />
          </View>
        ) : validate ? (
          <View style={[validatestylemark]}>
            <Icons name={'ios-checkmark-sharp'} size={35} color={'white'} />
          </View>
        ) : (
          <View />
        )}
      </View>
      {validate === false ? (
        <Text style={[validatetext]}>{text}</Text>
      ) : (
        <View />
      )}
    </View>
  );
};

export const Footer = ({
  navigation,
  text,
  viewstyle,
  textstyle,
  buttonstyle,
  navigationpage,
  buttontext,
  press,
}: FOOTER) => {
  return (
    <View style={viewstyle}>
      <Text style={textstyle}>{text}</Text>
      <Button
        text={buttontext}
        onPress={
          navigation && navigationpage
            ? () => navigation.navigate(navigationpage)
            : press
        }
        style={buttonstyle}
      />
    </View>
  );
};
