import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Touchable,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
 
} from 'react-native';
import Input from '../../components/inputs/Password';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

import Email from '../../components/inputs/Email';
import Bg from '../../../assets/images/splash.png';
import Logo from '../../../assets/images/logo.png';

import Button from '../../components/green-button/Button';
import InactiveButton from '../../components/inactive-button/Button';
import Loader from "../../components/loader/Loader"
import { AppContext } from '../../../App';
import { showMessage, hideMessage } from 'react-native-flash-message';
import * as Device from 'expo-device';


import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  useFonts,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_400Regular,
  Nunito_600SemiBold,
} from '@expo-google-fonts/nunito';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const app = useContext(AppContext);
  var login = app.login;
  const success = app.success;
  const err = app.err;




  useEffect(async  () => {
    const deviceId = await AsyncStorage.getItem('deviceId');
   if(deviceId){
      
    }else{
      AsyncStorage.setItem('deviceId',Device.osInternalBuildId);

    }
    
  }, [])

  const handleLogin = () => {
    Keyboard.dismiss()
    let username = email;
    login(username, password, setModalVisible, setMessage,setLoading);
  };
  
  if (err && message) {
    showMessage({
      message: 'ERROR',
      description: message,
      type: 'danger',
    });
    setMessage(false);
  }

  if (success && message) {
    showMessage({
      message: 'SUCCESS',
      description: message,
      type: 'success',
    });
    setMessage(false);
  }

  // const handleLogin =async () => {
  // //await AsyncStorage.removeItem("userEmail")
  //   navigation.navigate('DashboardScreen')
  // };

  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView >
        
        <ImageBackground  source={Bg} resizeMode='cover' style={styles.imagebg}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        
          <View keyboardShouldPersistTaps="handled" style={styles.container}>
            <View style={styles.logo}>
              <Image source={Logo} />
            </View>
            <View style={styles.input}>
              <Email outlinecolor='grey' email={email} setEmail={setEmail} />
            </View>
            <View style={styles.input}>
              <Input
                label='Password'
                placeholder='Password(8 characters minimum)'
                outlinecolor='grey'
                password={password}
                setPassword={setPassword}
              />
            </View>
            <View style={styles.forgotpasbox}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotScreen')}
              >
                <Text style={styles.forgotpas}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  () => alert('Not part of the the discussed features')
                  //navigation.navigate('RegisterScreen')
                }
              >
                <Text style={styles.forgotpas}>Don't have an account ?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              {password.length>7 && email ? (
                <Button
                  //loading={loading}
                  handleNavigate={handleLogin}
                  text='Login'
                />
              ) : (
                <InactiveButton text='Login' />
              )}
            </View>
          

          
          </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
        {/* </ScrollView> */}
        <Loader loading={loading}/> 
      </SafeAreaView>
    );
  }
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,

    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },

  forgotpasbox: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  forgotpas: {
    marginTop: 10,
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
  },
  button: {
    marginTop: 30,
  },
  input: {
    marginTop: 20,
  },
  imagebg: {
    width: '100%',
    height: '100%',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
