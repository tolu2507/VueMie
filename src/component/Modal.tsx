/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Button, Modal, Alert} from 'react-native';
import ModalViewComponent from './ModalViewComponent';

const MyModal = ({user, navigation,token}: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          return setModalVisible(!modalVisible);
        }}>
        <ModalViewComponent user={user} navigation={navigation} token={token} />
      </Modal>

      <View
        style={{
          padding: 20,
          width: '90%',
          borderRadius: 20,
          backgroundColor: '#654EE8',
        }}>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 20,
            padding: 2,
            backgroundColor: 'white',
            borderColor: '#654EE8',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
            }}>
            Before you contine here is a quick todo.
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
            }}>
            You need to provide your name and Profile Picture
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
            }}>
            To ge the best experience from the Applucation.
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
            }}>
            sorry for the incovinience.
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
            }}>
            Click the button to get started!!!!!!
          </Text>
        </View>
        <View style={{alignItems: 'flex-end', marginTop: 20, width: 290}}>
          <Button
            title="click me"
            onPress={() => setModalVisible(!modalVisible)}
            color={'blue'}
          />
        </View>
      </View>
    </View>
  );
};

export default MyModal;
