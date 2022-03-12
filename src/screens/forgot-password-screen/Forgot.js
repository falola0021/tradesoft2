import React, { useEffect } from 'react';
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
} from 'react-native';
import Input from '../../components/inputs/Password';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

import Email from '../../components/inputs/Email';
import Bg from '../../../assets/images/splash.png';
import Logo from '../../../assets/images/logo.png';

import Button from '../../components/green-button/Button';
import InactiveButton from '../../components/inactive-button/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import Auth from '../../services/auth.service';
// import EModal from '../../components/errorModal/EModal';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleNavigate = () => {
    // login(email, password, setErr, setModalVisible);
  };

  //   const handleNavigateB =async () => {
  //   await AsyncStorage.removeItem("userEmail")
  //     navigation.navigate('LoginScreenB')
  //   };

  return (
    <SafeAreaView>
      <ImageBackground source={Bg} resizeMode='cover' style={styles.imagebg}>
        {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      > */}
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={Logo} />
          </View>
          <Text style={styles.forgotpas}>
            Fill in your email address below and we will send you a link to
            reset your password.
          </Text>

          <View style={styles.input}>
            <Email outlinecolor='grey' email={email} setEmail={setEmail} />
          </View>

          <View style={styles.button}>
            {email ? (
              <Button
                //loading={loading}
                //   handleNavigate={handleNavigate}
                text='Send reset link'
              />
            ) : (
              <InactiveButton text='Send reset link' />
            )}
          </View>
          <View style={styles.forgotpasbox}>
            <TouchableOpacity
              style={styles.vw}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.forgotpas}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
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
  vw: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
});
