/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Icons from 'react-native-vector-icons/Ionicons';
import {firebase} from '@react-native-firebase/auth';

import {landing} from './images';
import {Button} from './Button';
import style from '../common/stlye';
const {
  buttonView,
  button,
  container,
  flex,
  textBig,
  textMid,
  textSmall,
  animation,
} = style.landing;

const Landing = ({navigation, route}: any) => {
  const {tokens} = route.params;
  const user = firebase.auth().currentUser;
  let tok: any;

  if (user !== null) {
    tok = user !== null && {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      password: false,
      phonenumber: user.phoneNumber,
      image: user.photoURL,
      token: tokens,
    };
    return (
      <ImageBackground source={landing} style={flex}>
        <View style={container}>
          <View>
            <Text style={textBig}>Welcome to the new world</Text>
            <Text style={textMid}>
              Explore the Diversity herewith and in all
            </Text>
            <Text style={textSmall}>Enjoy your Experience.</Text>
          </View>
          <Animatable.View
            animation={'bounce'}
            easing="ease-in-out"
            iterationCount={'infinite'}
            style={animation}>
            <Icons name={'star-sharp'} color={'gold'} size={130} />
          </Animatable.View>
        </View>
        <View style={buttonView}>
          <Button
            text="ENTER"
            onPress={() => navigation.navigate('Dashboard', {token: tok})}
            style={button}
          />
        </View>
      </ImageBackground>
    );
  }
  if (user === null) {
    return navigation.navigate('Login');
  }
};

export default Landing;
