/* eslint-disable prettier/prettier */
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
export const Loading = () => {
  return (
    <ActivityIndicator
      animating={true}
      color={'#B4BAFF'}
      size={100}
      style={styles.indicator}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    // marginTop: 300,
    // opacity: 0.5,
    backgroundColor: '#654EE8',
    // borderRadius: 20,
  },
});
