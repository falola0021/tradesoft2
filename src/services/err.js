import React, { useState,useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../App';


export default () => {
  const navigation = useNavigation();
  const app = useContext(AppContext);
  //var logout = app.logout;

  const error = (
    e,
    setMessage,
    setModalVisible,
    setErr,
    setSuccess,
    setLoading
  ) => {
   
    setLoading(false);
    setSuccess(false);
    setErr(true);
    if (e.toJSON().message === 'Network Error') {
      setMessage('Session timeout, please login again');
      setModalVisible(true);
      setErr(true)
    }

    console.log(e, 'the error');
    const resMessage =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();

    if (typeof resMessage == 'string') {
      setMessage(resMessage);
    } else {
      Object.values(resMessage).map((msg) => {
        msg.map((item, index) => {
          setMessage(item);
        });
      });
    }
    if (e.response.status == 401 || e.response == 405) {
      AsyncStorage.removeItem('userToken');
      setMessage('Session timeout, please login again');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('LoginScreen');
      }, 2500);
    }

    if (e.response.status == 500) {
      setMessage('Something went wrong');
      setErr(true)
    }

    //    if(e.message === 'Network Error'){
    //     alert('no internet connection');

    // }

    setModalVisible(true);
  };

  return {
    error,
  };
};
