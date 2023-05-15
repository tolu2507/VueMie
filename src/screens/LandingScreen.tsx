/* eslint-disable prettier/prettier */
import React from 'react';
// import {View, Text} from 'react-native';
import Landing from '../component/Landing';

const LandingScreen = ({navigation,route}: any) => {
  return <Landing navigation={navigation} route={route} />;
};

export default LandingScreen;
