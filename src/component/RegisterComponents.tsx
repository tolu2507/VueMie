/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image} from 'react-native';
import {Input, Task} from '../common/TextInput';
import {Button} from './Button';
import * as Progress from 'react-native-progress';

export interface REGISTER {
  Top: {
    image: any;
    firebaseButton: {};
    selectImage: () => any;
    uploading: boolean;
    uploadImage: () => any;
    images: {};
    url: any;
    imageStyle: {};
    innerImage: {};
    loadingStyle: {};
    transferred: number;
  };
  Buttom: {
    data: Task[];
    signUp: () => any;
    check: boolean;
    button: {};
  };
}

export const RegisterTop = ({
  image,
  firebaseButton,
  selectImage,
  uploading,
  uploadImage,
  images,
  url,
  imageStyle,
  innerImage,
  loadingStyle,
  transferred,
}: REGISTER['Top']) => {
  return (
    <View>
      {image === null ? (
        <Button
          style={[firebaseButton]}
          onPress={selectImage}
          text="Pick an image"
        />
      ) : !uploading ? (
        <Button
          style={[firebaseButton]}
          onPress={uploadImage}
          text="Upload image"
        />
      ) : null}
      <View style={[images]}>
        {image !== null ? (
          <View style={[innerImage]}>
            <Image source={{uri: url.uri}} style={[imageStyle]} />
          </View>
        ) : null}
        {uploading ? (
          <View style={[loadingStyle]}>
            <Progress.Bar progress={transferred} width={300} color="black" />
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export const RegisterBottom = ({
  data,
  signUp,
  check,
  button,
}: REGISTER['Buttom']) => {
  return (
    <>
      {/* input field */}
      {data.map((item: Task) => {
        return (
          <View key={item.key}>
            <Input
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={item.onChangeText}
              secureTextEntry={item.secureTextEntry}
              validate={item.validate}
              icon={item.icon}
              text={item.text}
              keyboardType={item.keyboardType}
            />
          </View>
        );
      })}

      {/* button field */}
      <Button
        text={'Create'}
        onPress={signUp}
        disabled={check}
        style={[button]}
      />
    </>
  );
};
