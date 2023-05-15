/* eslint-disable prettier/prettier */
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

type Animated = {
  text?: string | undefined;
  icon?: any;
  onPress: () => any;
  textStyle?: {};
  view?: {};
  animationStyle?: {};
  animate?: string;
};

type Normal = {
  text?: string | undefined;
  icon?: any;
  onPress: () => any;
  style?: {};
  textStyle?: {};
  disabled?: boolean;
};

export const AnimatedButton = ({
  text,
  view,
  icon,
  onPress,
  textStyle = {fontSize: 15, fontWeight: 900},
  animationStyle,
  animate,
}: Animated) => {
  return (
    <Animatable.View
      animation={animate}
      easing="ease-in-out"
      iterationCount={'infinite'}
      style={animationStyle}>
      <Pressable onPress={onPress} android_ripple={{color: 'white'}}>
        <View style={view}>
          {text && <Text style={textStyle}>{text}</Text>}
          {icon && icon}
        </View>
      </Pressable>
    </Animatable.View>
  );
};

export const Button: any = ({
  text,
  icon,
  onPress,
  textStyle = {
    fontSize: 15,
    fontWeight: 900,
    color: 'black',
    textTransform: 'uppercase',
  },
  style,
  disabled = false,
}: Normal) => {
  if (disabled === false) {
    return (
      <Pressable
        onPress={onPress}
        android_ripple={{color: 'white'}}
        disabled={disabled}
        style={style}>
        {text && <Text style={textStyle}>{text}</Text>}
        {icon && icon}
      </Pressable>
    );
  }
};

export default function StyledButton({
  handleSelector,
  style,
  styleText,
  styles,
  styleTexts,
  items,
  selector,
}: {
  items: string;
  styleText: any;
  styleTexts: any;
  style: any;
  styles: any;
  handleSelector: () => void;
  selector: string;
}): any {
  return (
    <Pressable
      key={items}
      onPress={handleSelector}
      style={items === selector ? style : styles}>
      <Text style={items === selector ? styleText : styleTexts}>{items}</Text>
    </Pressable>
  );
}
