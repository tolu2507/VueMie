/* eslint-disable prettier/prettier */
import React from 'react';
import Dashboard from '../component/Dashboard';
import {USER} from '../services/UserService';
import MyModal from '../component/Modal';
import {firebase} from '@react-native-firebase/firestore';
import {View, Text} from 'react-native';

const DashboardScreen = ({route, navigation}: any) => {
  const {token, tokens} = route.params;
  const user = firebase.auth().currentUser;

  let returner = (
    <View>
      <Text>how are you doing</Text>
    </View>
  );
  if (user !== null) {
    let users: USER = {
      id: user.uid,
      name: user.displayName ? user.displayName : '',
      email: user.email ? user.email : '',
      password: true,
      phonenumber: user.phoneNumber ? user.phoneNumber : '',
      image: user.photoURL ? user.photoURL : '',
      token: tokens,
    };
    console.log(token);

    const details: {
      token: USER;
      navigation: any;
    } = {
      token: users,
      navigation: navigation,
    };

    return user.displayName === null
      ? (returner = (
          <MyModal user={user} navigation={navigation} token={tokens} />
        ))
      : (returner = <Dashboard {...details} />);
  }
  return returner;
};

export default DashboardScreen;
