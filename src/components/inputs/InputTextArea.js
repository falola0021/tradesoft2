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
const Password = ({ icon, label, placeholder,val, setVal }) => {
  
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
          numberOfLines={4}
          multiline={true}
          //keyboardType="numeric"
          label={label}
          placeholderTextColor='rgba(46, 58, 89, 0.5)'
          placeholder={placeholder}
          value={val}
          onChangeText={(text) => setVal(text)}
          mode='outlined'
          direction='rtl'
          outlineColor={ !val ?"rgba(46, 58, 89, 0.2)": 'rgba(46, 58, 89, 0.2)'}
          style={styles.input}
          theme={{
            colors: {
              primary: 'rgba(46, 58, 89, 0.4)',
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
