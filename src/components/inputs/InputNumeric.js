import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons';
import {
  useFonts,
  Nunito_700Bold,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';
const Password = ({ icon, label, placeholder,val, setVal,err,characterlength }) => {
  
  const [hidePass, setHidePass] = useState(true);
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <TextInput
          mode=''
          maxLength = {characterlength}

          keyboardType="numeric"
          label={label}
          placeholderTextColor='#2E3A59'
          placeholder={placeholder}
          value={val}
          onChangeText={(text) => setVal(text)}
          mode='outlined'
          direction='rtl'
          outlineColor={err && !val ?"#C81C1C": '#0130B0'}
          style={styles.input}
          theme={{
            colors: {
              primary: '#0130B0',
              underlineColor: 'transparent',
            },
          }}
        />
        <FontAwesome
          name={icon}
          size={15}
          color='#2E3A59'
          onPress={() => setHidePass(!hidePass)}
          style={styles.inputicon}
        />
      </View>
    );
  }
};

export default Password;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
  },

  inputicon: {
    textAlign: 'right',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: 1,
  },
});
