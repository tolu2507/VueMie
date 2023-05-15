/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import style from '../common/stlye';
import {Message} from './ChatApp';
import {RenderItem} from './render';
import {USER} from '../services/UserService';

const {icon, flatlist, container} = style.chat;

const MessageListComponent = ({
  user,
  selected,
  setSelected,
  messages,
}: MessageListComponents) => {

  return (
    <View style={flatlist}>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <RenderItem
            item={item}
            user={user}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        keyExtractor={item => item.id}
        inverted
      />
    </View>
  );
};

export default MessageListComponent;

interface MessageListComponents {
  user: USER;
  selected: Message['id'][];
  setSelected: (val: any) => void;
  messages: Message[];
}
interface Blank {
  newStyle: {
    flex: number;
    padding: number;
    borderRadius: number;
  };
  res: USER;
}
export const BlankPage = ({newStyle, res}: Blank) => {
  return (
    <View style={container}>
      <View style={[icon, newStyle]}>
        <Text>{res.name}</Text>
      </View>
    </View>
  );
};
