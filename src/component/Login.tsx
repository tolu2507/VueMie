/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button} from './Button';
import {USER} from '../services/UserService';
import {Loading} from '../common/Loading';
import Icons from 'react-native-vector-icons/Ionicons';
import {Input, Task} from '../common/TextInput';
import Tester from '../common/Tester';
import style from '../common/stlye';
// import {NotificationController} from '../services/Pushnotification';
import {signinOptions} from '../common/SigninAndLonginFunctions';

export const Login = ({navigation, channel}: any) => {
  const [email, setEmail] = useState('');
  const [dashboard, setDashboard] = useState<any>(null);
  const [password, setPassword] = useState('');
  const default_details: USER = {
    email: email,
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatzz-338a2.appspot.com/o/rn_image_picker_lib_temp_b148caed-3ba3-4093-8164-d0c742e3e07a.jpg?alt=media&token=1e2538d3-fef5-476c-9bee-ba07a184b4e8',
    name: 'Fadeke ',
    password: password ? true : false,
    phonenumber: '07038968337',
    id: '',
    token: '',
  };
  const [loading, setLoading] = useState<Boolean>(false);
  const [validateEmail, setEmailValidate] = useState<boolean>();
  const [validatePassword, setPasswordValidate] = useState<boolean>();
  const [check, setCheck] = useState<boolean>(false);
  const data: Task[] = [
    {
      key: 1,
      placeholder: 'Email',
      value: email,
      onChangeText: handleEmail,
      secureTextEntry: false,
      validate: validateEmail,
      icon: <Icons name={'mail'} size={25} color={'#080A34'} />,
      text: 'Enter a valid email',
    },
    {
      key: 2,
      placeholder: 'Password',
      value: password,
      onChangeText: handlePassword,
      secureTextEntry: true,
      validate: validatePassword,
      icon: <Icons name={'eye-off'} size={25} color={'#080A34'} />,
      text: 'Enter a valid password must contain - one capital letter - special character - number',
    },
  ];
  const {butt, loginviewstyle, innerview, innerviewbutton} = style.login;

  useEffect(() => {
    if (validateEmail === true && validatePassword === true) {
      return setCheck(false);
    }
    setCheck(true);
  }, [validateEmail, validatePassword]);

  function handleEmail(emailtarget: string) {
    setEmail(emailtarget);
    setEmailValidate(Tester({type: 'email', data: email}));
  }

  function handlePassword(passwordtarget: string) {
    setPassword(passwordtarget);
    setPasswordValidate(Tester({type: 'password', data: password}));
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={[loginviewstyle]}>
      <View style={[innerview]}>
        {/* input view */}
        {data.map((inp: Task) => {
          return (
            <View key={inp.key}>
              <Input
                placeholder={inp.placeholder}
                value={inp.value}
                onChangeText={inp.onChangeText}
                secureTextEntry={inp.secureTextEntry}
                validate={inp.validate}
                icon={inp.icon}
                text={inp.text}
              />
            </View>
          );
        })}
        {/* Signin button view */}
        <View style={butt}>
          <Button
            text={'Sign In'}
            onPress={() =>
              signinOptions({
                setLoading,
                setDashboard,
                password,
                email,
                navigation,
                dashboard,
                channel,
                default_details,
                type: 'signin',
              })
            }
            disabled={check}
            style={innerviewbutton}
          />
          <Button
            text={'Sign Up'}
            onPress={() =>
              signinOptions({
                setLoading,
                setDashboard,
                password,
                email,
                navigation,
                dashboard,
                channel,
                default_details,
                type: 'signup',
              })
            }
            disabled={check}
            style={innerviewbutton}
          />
        </View>
      </View>
    </View>
  );
};
