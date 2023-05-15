/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {Button} from './Button';
import style from '../common/stlye';
import {Top, Bottom} from './Blocks';

export interface DATA {
  key: number;
  text: string;
  navigations: any;
  styles: {};
}

const Error = ({route, navigation}: any) => {
  const {res} = route?.params;
  const {
    container,
    one,
    headertext,
    content,
    innercontent,
    contenttext,
    contentbuttonlogin,
    contentbuttonview,
    contentbuttonregister,
  } = style.error;
  const data: DATA[] = [
    {
      key: 1,
      text: 'Login',
      navigations: navigation,
      styles: contentbuttonlogin,
    },
    {
      key: 2,
      text: 'Register',
      navigations: navigation,
      styles: contentbuttonregister,
    },
  ];
  return (
    <View style={[container]}>
      <Top one={one} headertext={headertext} />
      <Bottom
        content={content}
        innercontent={innercontent}
        contenttext={contenttext}
        contentbuttonview={contentbuttonview}
        data={data}
        res={res}
        Button={Button}
      />
    </View>
  );
};

export default Error;
