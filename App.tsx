/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {firebase} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import Register from './src/component/Register';
import Error from './src/component/Error';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import UsersScreen from './src/screens/UsersScreen';
import ChatAppScreen from './src/screens/ChatAppScreen';
// import {Alert} from 'react-native';

const Stack = createStackNavigator();
function App(): JSX.Element {
  const [token, setToken] = useState('');
  useEffect(() => {
    // const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    //   if (!user) {
    //     firebase.auth().signInAnonymously();
    //   }
    // });

    messaging()
      .requestPermission()
      .then(() => {
        console.log('Permission granted');
        messaging()
          .getToken()
          .then(toks => {
            console.log('FCM Token:', toks);
            setToken(toks);
          });
      })
      .catch(error => {
        console.log('Permission denied', error);
      });

    messaging().onMessage(async remoteMessage => {
      console.log('Received in foreground', remoteMessage);
    });
  });
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          initialParams={{tokens: token}}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          initialParams={{tokens: token}}
        />
        <Stack.Screen name="Chat" component={ChatAppScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Error" component={Error} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
