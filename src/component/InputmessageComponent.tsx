/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput} from 'react-native';
import style from '../common/stlye';
import {Button} from './Button';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputmessageComponent = ({
  backgroundColor,
  colors,
  text,
  setText,
  onSend,
  updateButtonColor,
}: InputMessage) => {
  const {button, input, inputView} = style.chat;
  return (
    <View style={inputView}>
      <TextInput
        style={[input, {backgroundColor: backgroundColor, color: colors}]}
        multiline={true}
        placeholder="Send Message"
        value={text}
        onChangeText={setText}
      />
      <Button
        icon={<Icon name={'send'} size={25} color={'#FFFFFF'} />}
        onPress={onSend}
        style={[button, updateButtonColor]}
      />
    </View>
  );
};

export default InputmessageComponent;

interface InputMessage {
  backgroundColor: string;
  colors: string;
  text: string;
  setText: any;
  onSend: () => Promise<void>;
  updateButtonColor: {
    backgroundColor: string;
    width: number;
    height: number;
    borderRadius: number;
  };
}
