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
const EmailEdit = ({value,setUserEmail,err}) => {
  const [text, setText] = React.useState('');
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
          label='Email Address'
          placeholderTextColor='#2E3A59'
   
          value={value}
         defaultValue={value}
          onChangeText={setUserEmail}
          mode='outlined'
          direction='rtl'
          outlineColor={err && !value ?"#C81C1C": '#0130B0'}
          style={styles.input}
          theme={{
            colors: {
              primary: '#0130B0',
              underlineColor: 'transparent',
            },
          }}
        />
        <FontAwesome
          name='pencil'
          size={15}
          color='#2E3A59'
          // onPress={() => setHidePass(!hidePass)}
          style={styles.inputicon}
        />
      </View>
    );
  }
};

export default EmailEdit;

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
