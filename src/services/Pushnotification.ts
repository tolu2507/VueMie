/* eslint-disable prettier/prettier */
// import {useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';

interface Notification {
  channelname: string;
  channelid: string;
  channeldescription: string;
}
export const NotificationController = ({
  channelname,
  channelid,
  channeldescription,
}: Notification) => {
  PushNotification.createChannel(
    {
      channelId: channelid,
      channelName: channelname,
      channelDescription: channeldescription,
      importance: Importance.HIGH, // Set the importance level
      vibrate: true, // Enable vibration
      soundName: 'default', // Set the default sound
      playSound: true, // Enable playing sound when a notification is received
    },
    created => console.log(`createChannel: ${created}`),
  );
};

export const sendPushNotification = async (
  message: string,
  user: string,
  channelId: string,
) => {
  PushNotification.cancelAllLocalNotifications();
  return PushNotification.localNotification({
    channelId: channelId,
    title: `New message from ${user}`,
    message: message,
    color: 'purple',
    ignoreInForeground: true,
  });
};

export const subscribe = (topic: string) => {
  return PushNotification.subscribeToTopic(topic);
};
