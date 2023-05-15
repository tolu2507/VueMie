/* eslint-disable prettier/prettier */
import {firebase} from '@react-native-firebase/firestore';

export type USER = {
  id: string;
  name: string;
  email: string;
  password: boolean;
  phonenumber: string;
  image: string;
  onPress?: () => void;
  token: string;
};
export const Service = {
  createUser: async (details: USER) => {
    await firebase.firestore().collection('User').add({
      id: details.id,
      name: details.name,
      email: details.email,
      password: details.password,
      phonenumber: details.phonenumber,
      image: details.image,
      token: details.token,
    });
  },
};
