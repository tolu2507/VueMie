/* eslint-disable prettier/prettier */
import {sendPushNotification} from '../services/Pushnotification';
import {firebase} from '@react-native-firebase/auth';
import {USER} from '../services/UserService';

export const signinOptions = async ({
  setLoading,
  setDashboard,
  password,
  email,
  navigation,
  dashboard,
  channel,
  default_details,
  type,
}: SIGNOPTIONS) => {
  setLoading(true);
  if (!email || !password) {
    setLoading(false);
    navigation.navigate('Error', {
      res: 'Please provide a valid email address or password, email cannot be empty, and password cannot be empty',
    });
  }
  if (type === 'signin') {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // User signed in successfully, now you can get the user information
          const user = userCredential.user;
          setDashboard(user);
          console.log('User:', user);
        })
        .then(() => {
          console.log(dashboard);
          sendPushNotification('Successfully loggedin', channel, channel);
        })
        .then(() => {
          setLoading(false);
          navigation.navigate('Dashboard', {
            token: default_details,
            user: dashboard,
          });
        });
    } catch (error: any) {
      setLoading(false);
      if (error) {
        navigation.navigate('Error', {res: error.message});
      }
    }
  }
  if (type === 'signup') {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // User signed in successfully, now you can get the user information
          const user = userCredential.user;
          setDashboard(user);
          console.log('User:', user);
        })
        .then(() => {
          console.log(dashboard);
          sendPushNotification('Successfully loggedin', channel, channel);
        })
        .then(() => {
          setLoading(false);
          navigation.navigate('Dashboard', {
            token: default_details,
            user: dashboard,
          });
        });
    } catch (error: any) {
      setLoading(false);
      if (error) {
        navigation.navigate('Error', {res: error.message});
      }
    }
  }
};

interface SIGNOPTIONS {
  setLoading: (val: any) => void;
  setDashboard: (val: any) => void;
  password: string;
  email: string;
  navigation: any;
  dashboard: any;
  channel: string;
  default_details: USER;
  type: 'signin' | 'signup';
}
