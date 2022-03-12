import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import AppLoading from 'expo-app-loading'
import { FontAwesome } from '@expo/vector-icons'
import { useFonts, Nunito_700Bold, Nunito_400Regular} from '@expo-google-fonts/nunito'


const Email = ({setEmail,email,err,outlinecolor}) => {
 let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  Nunito_400Regular})
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View>
        <TextInput
          label='Email Address'
          placeholderTextColor='#2E3A59'
          placeholder='Email Address'
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode='outlined'
          direction='rtl'
          outlineColor={err && !password ?"#C81C1C": outlinecolor}
          style={styles.input}
          theme={{ colors: { primary:"#66C825",underlineColor: 'transparent'}}} />
      </View>
    )
  }
}

export default Email

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold'
  },

  inputicon: {
    textAlign: 'right',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: 1
  }
})
