/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Platform, Alert, Keyboard, Pressable} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import Icons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import {Service, USER} from '../services/UserService';
import {Task} from '../common/TextInput';
import style from '../common/stlye';
import Tester from '../common/Tester';
import {Loading} from '../common/Loading';
import {RegisterBottom, RegisterTop} from './RegisterComponents';

export interface Validate {
  name?: null | undefined | boolean;
  emails?: null | undefined | boolean;
  password?: null | undefined | boolean;
  phonenumber?: null | undefined | boolean;
}

const Register = ({navigation}: any) => {
  const [email, setEmail] = useState({values: '', validation: false});
  const [password, setPassword] = useState({values: '', validation: false});
  const [name, setName] = useState({values: '', validation: false});
  const [phonenumber, setPhonenumber] = useState({
    values: '',
    validation: false,
  });
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [validator, setValidator] = useState<Validate>({
    name: null,
    emails: null,
    password: null,
    phonenumber: null,
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const [check, setCheck] = useState<boolean>(true);

  const {
    stylez,
    container,
    innerContainer,
    button,
    firebaseButton,
    images,
    innerImage,
    imageStyle,
    inputStyle,
    loadingStyle,
    footerStyle,
    footerText,
    footerButton,
  } = style.register;

  const data: Task[] = [
    {
      key: 1,
      placeholder: 'Enter Your Name ? ',
      value: name.values,
      onChangeText: handleName,
      secureTextEntry: false,
      styles: stylez,
      validate: validator.name,
      icon: <Icons name={'person'} size={20} color={'#080A34'} />,
      text: 'Length of name have to be greater than 3',
    },
    {
      key: 2,
      placeholder: 'Enter your Email',
      value: email.values,
      onChangeText: handleEmail,
      secureTextEntry: false,
      styles: stylez,
      validate: validator.emails,
      icon: <Icons name={'mail'} size={20} color={'#080A34'} />,
      text: 'Enter a valid email',
      keyboardType: 'email-address',
    },
    {
      key: 3,
      placeholder: 'Enter your Phone-Number ? ',
      value: phonenumber.values,
      onChangeText: handleNumber,
      secureTextEntry: false,
      styles: stylez,
      validate: validator.phonenumber,
      icon: <Icons name={'call'} size={20} color={'#080A34'} />,
      text: 'Enter a valid number, start with country code',
      // keyboardType: 'numeric',
    },
    {
      key: 4,
      placeholder: 'Enter your Password',
      value: password.values,
      onChangeText: handlePassword,
      secureTextEntry: true,
      styles: stylez,
      validate: validator.password,
      icon: <Icons name={'eye-off'} size={20} color={'#080A34'} />,
      text: 'Enter a valid password must contain - one capital letter - special character - number',
    },
  ];

  const selectImage = () => {
    const options: any = {
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(response);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    setImage(null);
    const url = await storage().ref(`${filename}`).getDownloadURL();
    if (url !== null || url === undefined) {
      console.log(url);
      setImageUrl(url);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const user_details: USER = {
        id: '',
        name: name.values,
        email: email.values,
        password: password.values ? true : false,
        phonenumber: phonenumber.values,
        image: imageUrl,
        token: '',
      };
      console.log(user_details);

      await Service.createUser(user_details);
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.values, password.values)
        .then(() => {
          setLoading(false);
          setEmail({...email, values: ''});
          setName({...name, values: ''});
          setPassword({...password, values: ''});
          setPhonenumber({...phonenumber, values: ''});
          setImageUrl('');
          setValidator({
            ...validator,
            name: null,
            emails: null,
            password: null,
            phonenumber: null,
          });
          setCheck(true);
          navigation.navigate('Dashboard', {token: user_details});
        });
    } catch (error: any) {
      if (error) {
        setLoading(false);
        navigation.navigate('Error', {res: error.message});
      }
    }
  };

  function handleName(target: any) {
    setName({...name, values: target});
    if (name.values) {
      setValidator({
        ...validator,
        name: Tester({type: 'name', data: name.values}),
      });
      console.log(validator);
    }
  }

  function handleEmail(target: any) {
    setEmail({...email, values: target});
    if (email.values.length) {
      setValidator({
        ...validator,
        emails: Tester({type: 'email', data: email.values}),
      });
    }
  }

  function handleNumber(target: any) {
    setPhonenumber({...phonenumber, values: target});
    if (phonenumber.values.length) {
      setValidator({
        ...validator,
        phonenumber: Tester({type: 'phonenumber', data: phonenumber.values}),
      });
    }
  }

  function handlePassword(target: any) {
    setPassword({...password, values: target});
    if (password.values.length) {
      setValidator({
        ...validator,
        password: Tester({type: 'password', data: password.values}),
      });
    }
  }

  useEffect(() => {
    if (
      validator.emails &&
      validator.name &&
      validator.password &&
      validator.phonenumber
    ) {
      return setCheck(false);
    }
  }, [
    validator.emails,
    validator.name,
    validator.password,
    validator.phonenumber,
  ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={[container]}>
      <View style={[innerContainer]}>
        {/* top register field*/}
        <RegisterTop
          image={image}
          firebaseButton={firebaseButton}
          selectImage={selectImage}
          uploading={uploading}
          uploadImage={uploadImage}
          images={images}
          url={image}
          imageStyle={imageStyle}
          innerImage={innerImage}
          loadingStyle={loadingStyle}
          transferred={transferred}
        />

        {/* bottom register field */}
        <View style={[inputStyle]}>
          <RegisterBottom
            data={data}
            signUp={signUp}
            check={check}
            button={button}
            navigation={navigation}
            footerStyle={footerStyle}
            footerText={footerText}
            footerButton={footerButton}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default Register;
