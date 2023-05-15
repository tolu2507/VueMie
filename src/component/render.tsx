/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import style from '../common/stlye';
import {Message} from './ChatApp';
import {TimeAndIcon} from './IconPicker';
import {USER} from '../services/UserService';
import PressableComponent from '../common/PressableComponent';

const {render, textStyle, text} = style.chat;

const Render = ({
  item,
  alignItems,
  backgroundColor,
  selected,
  setSelected,
  color,
  user,
}: RENDER) => {
  return (
    <View key={item.id} style={[render, {alignItems: alignItems}]}>
      <PressableComponent
        alignItems={alignItems}
        backgroundColor={backgroundColor}
        selected={selected}
        setSelected={setSelected}
        item={item}>
        <View style={text}>
          <Text style={[textStyle, {color: color}]}>{item?.texts}</Text>
        </View>
        <TimeAndIcon
          selected={selected}
          item={item}
          color={color}
          user={user}
        />
      </PressableComponent>
    </View>
  );
};

export default Render;

interface RENDER {
  item: Message;
  alignItems: string;
  backgroundColor: string;
  selected: Message['id'][];
  setSelected: (val: any) => void;
  color: string;
  user: USER;
}

export const RenderItem = ({
  item,
  user,
  selected,
  setSelected,
}: {
  item: Message;
  user: USER;
  selected: string[];
  setSelected: (val: any) => void;
}) => {
  const backgroundColor =
    item.user.displayName === user.name ? '#654EE8' : '#B4BAFF';
  const alignItems =
    item.user.displayName === user.name ? 'flex-end' : 'flex-start';
  const color = item.user.displayName === user.name ? 'white' : 'black';

  return (
    <Render
      item={item}
      alignItems={alignItems}
      backgroundColor={backgroundColor}
      selected={selected}
      setSelected={setSelected}
      color={color}
      user={user}
    />
  );
};
