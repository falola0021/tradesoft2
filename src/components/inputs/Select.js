import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  useFonts,
  Nunito_700Bold,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';
const Password = ({ placeholder, value, handleNavigate, err }) => {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <TouchableOpacity
          onPress={handleNavigate}
          style={err && !value ? styles.inputbox2 : styles.inputbox}
        >
          <Text style={value ? styles.text2 : styles.text}>
            {value ? value : placeholder}
          </Text>
        </TouchableOpacity>
        <FontAwesome5
          name='chevron-down'
          size={15}
          color='#0130B0'
          style={styles.inputicon}
        />
      </View>
    );
  }
};

export default Password;

const styles = StyleSheet.create({
  inputbox: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    borderColor: '#0130B0',
    borderWidth: 1,
    padding: 18,
    borderRadius: 5,
  },
  inputbox2: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    borderColor: 'red',
    borderWidth: 1,
    padding: 18,
    borderRadius: 5,
  },
  text: {
    fontFamily: 'Nunito_600SemiBold',
    color: 'grey',
  },
  text2: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#000',
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
