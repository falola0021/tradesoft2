import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import AppLoading from 'expo-app-loading'
import { FontAwesome } from '@expo/vector-icons'
import { useFonts, Nunito_700Bold, Nunito_400Regular } from '@expo-google-fonts/nunito'
const Password = ({placeholder,label,password,setPassword,err,outlinecolor}) => {

  const [hidePass, setHidePass] = useState(true)
const handlepass=(text)=>{

  setPassword(text)
}



  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  Nunito_400Regular})
  if (!fontsLoaded) {
    return <AppLoading/>
  }else {
    return (
      <View>
        <TextInput
        
          label={label}
          placeholderTextColor='#2E3A59'
          placeholder={placeholder}
          password={true}
          value={password}
          onChangeText={text => handlepass(text)}
          mode='outlined'
          direction='rtl'
          outlineColor={err && !password ?"#C81C1C": outlinecolor}
          style={styles.input}
          secureTextEntry={hidePass ? true : false}
          theme={{ colors: { primary:"#66C825",underlineColor: 'transparent'}}} />
        <FontAwesome
          name={hidePass ? 'eye-slash' : 'eye'}
          size={15}
          color='#2E3A59'
          onPress={() => setHidePass(!hidePass)}
          style={styles.inputicon} />
      </View>

    )
  }
}

export default Password

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
