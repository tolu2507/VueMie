/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {USER} from '../services/UserService';
import {firebase} from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {anonymous, bank, chat, game, learn} from './images';
import {twitter} from '../common/Twitter';
import {DashboardContent, DashboardContentTop} from './Blocks';

export type Service = {
  key: number;
  name: string;
  image: any;
  onPress: () => void;
  disable: boolean;
};
const Dashboard = (token: any) => {
  const [users, setUsers] = useState<USER[] | any[]>([]);
  const [user] = useState<USER>(token.token);
  const services: Service[] = [
    {
      key: 1,
      name: 'Socialize',
      image: chat,
      onPress: () => {
        token.navigation.navigate('Users', {res: user, data: users});
      },
      disable: false,
    },
    {
      key: 2,
      name: 'Learn',
      image: learn,
      onPress: () => {
        token.navigation.navigate('Learn', {res: user});
      },
      disable: true,
    },
    {
      key: 3,
      name: 'Wallet',
      image: bank,
      onPress: () => {
        token.navigation.navigate('Bank', {res: user});
      },
      disable: true,
    },
    {
      key: 4,
      name: 'Games',
      image: game,
      onPress: () => {
        token.navigation.navigate('Game', {res: user});
      },
      disable: true,
    },
    {
      key: 5,
      name: 'Anonymous',
      image: anonymous,
      onPress: () => {
        token.navigation.navigate('Anonymous', {res: user});
      },
      disable: true,
    },
  ];
  const visuals: twitter[] = [
    {key: 1, value: 'twitter'},
    {key: 2, value: 'twitter'},
    {key: 3, value: 'twitter'},
  ];
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('User')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        if (!querySnapshot.empty) {
          setUsers(data);
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      {/* Top part */}
      <DashboardContentTop user={user} />
      {/* Down part */}
      <DashboardContent visuals={visuals} services={services} />
    </SafeAreaView>
  );
};

export default Dashboard;
