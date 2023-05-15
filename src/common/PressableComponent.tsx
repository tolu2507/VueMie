/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import style from './stlye';
import {Message} from '../component/ChatApp';

const PressableComponent = ({
  children,
  alignItems,
  backgroundColor,
  selected,
  setSelected,
  item,
}: PRESSABLE) => {
  const {touchable} = style.chat;

  function handleLongPress() {
    if (!selected.includes(item.id)) {
      setSelected((prev: any) => [...prev, item.id]);
    }
  }
  return (
    <TouchableOpacity
      style={[
        touchable,
        {alignItems: alignItems, backgroundColor: backgroundColor},
      ]}
      delayLongPress={100}
      onLongPress={handleLongPress}
      onPress={() => setSelected(selected.filter(items => items !== item.id))}
      activeOpacity={0.6}>
      {children}
    </TouchableOpacity>
  );
};

export default PressableComponent;

interface PRESSABLE {
  children: any;
  alignItems: string;
  backgroundColor: string;
  selected: string[];
  setSelected: (val: any) => void;
  item: Message;
}
