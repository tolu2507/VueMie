/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../common/stlye';
import {Message} from './ChatApp';
import {USER} from '../services/UserService';

const {textStyle, viewIcon, design, tes} = style.chat;

const IconPicker = ({item}: any) => {
  return (
    <View>
      {item?.read === true ? (
        <Icons name={'md-checkmark-done-sharp'} color={'black'} size={18} />
      ) : (
        <Icons name={'md-checkmark-sharp'} color={'black'} size={18} />
      )}
    </View>
  );
};

export default IconPicker;

export const TimeAndIcon = ({selected, item, color, user}: TIME) => {
  let fontSize = 12;
  let date = new Date(item.createdAt);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amOrPm = hours < 12 ? 'AM' : 'PM';
  let displayHours = hours > 12 ? hours - 12 : hours;

  let time = `${displayHours}:${minutes} ${amOrPm}`;

  return (
    <View style={viewIcon}>
      {selected.includes(item.id) && <Icon name={'star'} color={'black'} />}
      <View style={design}>
        <View style={tes}>
          <Text style={[textStyle, {color: color, fontSize: fontSize}]}>
            {time}
          </Text>
        </View>
        <View>
          {item?.user?.displayName === user?.name && <IconPicker item={item} />}
        </View>
      </View>
    </View>
  );
};

interface TIME {
  selected: string[];
  item: Message;
  color: string;
  user: USER;
}
