import React, { useState } from 'react';
import http from './http_common';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Error from './err';

export default () => {
  const { error } = Error();
  const navigation = useNavigation();
  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [myaccountinfo, setMyaccountinfo] = React.useState(null);



  const login =async (username, password, setModalVisible,setMessage,setLoading) => {


    if (!username || !password) {
      
      setMessage('Input(s) cannot be empty');
      setSuccess(false);
      setErr(true);
      return;
    }

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(username)) {
      setMessage('');
    } else {
      setMessage('This is not a valid email');
      setSuccess(false);
      setErr(true);

      return;
    }

    if (password.length > 7) {
      setMessage('');
    } else {
      setMessage('Password should be at least 8 characters');
      setSuccess(false);
      setErr(true);

      return;
    }

    setLoading(true);
    setModalVisible(true);
    
 const device_id = await AsyncStorage.getItem('deviceId');
   
 http().then((axios) => {
      axios
        .post('/auth', { username, password,device_id })
        .then((response) => {
          if(response.data.message=="Invalid credentials"){
            setLoading(false)
           setErr(true)
          
            setMessage(response.data.message)
            return
          }
        
          setErr(false)

          let user = response.data.data;
          AsyncStorage.setItem('firstname', user.first_name);
          AsyncStorage.setItem('userToken', user.token);
          setModalVisible(false);
          setMessage(`Wecome ${user.first_name}`)
          // setMessage(response.data.message);
          
          setLoading(false);
          getMyAccount(setModalVisible,setMessage,setLoading)
         //setSuccess(false);
         setSuccess(true);
          navigation.navigate('DashboardScreen')
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  const logout = async (setMessage) => {
    await AsyncStorage.removeItem('userToken');

    setMessage(`Logged out sucessfully .`)
 
    setSuccess(true);
    setSuccess(false);
    setErr(false);

    navigation.navigate('LoginScreen');
  };

  const getMyAccount =async ( setModalVisible,setMessage,setLoading) => {


   http().then((axios) => {
      axios
        .post('/get_my_account', )
        .then((response) => {
           setLoading(false)
          setErr(false)

          let userAccountInfo = response.data.data;
          setMyaccountinfo(userAccountInfo)
       
          setModalVisible(false);
         
        })
        .catch((e) => {
          error(e, setMessage, setModalVisible, setErr, setSuccess, setLoading);
        });
    });
  };

  return {
    login,
    logout,
    success,
    err,
    myaccountinfo
  };
};
