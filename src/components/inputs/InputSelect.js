import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import RightArrow from "../../../assets/anchorright.png"
import { FontAwesome5 } from '@expo/vector-icons';
import {
  useFonts,
  Nunito_700Bold,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';
const Password = ({item,handleNavigate }) => {

  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
       <TouchableOpacity onPress={()=>handleNavigate(item.name)} style={styles.inputbox} >
         <Text style={styles.text}>{item.val}</Text>
         <Image style={styles.rightarrow} source={RightArrow}/>
       </TouchableOpacity>
       
      </View>
    );
  }
};

export default Password;

const styles = StyleSheet.create({
  inputbox: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    borderColor:"#0130B0",
    borderWidth:1,
    padding:20,
    borderRadius:5,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  text:{
    fontFamily: 'Nunito_400Regular',
   color:"#2E3A59",
   fontWeight:"400"
  },

  inputicon: {
    textAlign: 'right',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: 1,

  },
  rightarrow:{
    width:10,
    height:17
  }
});
