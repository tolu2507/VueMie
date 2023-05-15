/* eslint-disable prettier/prettier */
import React from 'react';
import Users from '../component/Users';
import {USER} from '../services/UserService';

const UsersScreen = ({navigation, route}: any) => {
  const {data, res}: {data: USER[]; res: USER} = route.params;
  const details: DETAILS = {
    data: data,
    res: res,
    navigation: navigation,
  };
  return <Users {...details} />;
};

export default UsersScreen;

export interface DETAILS {
  data: USER[];
  res: USER;
  navigation: any;
}
