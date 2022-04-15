import React, { useState,useEffect,useContext } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Logo from "../../../../assets/images/logo.png"
import { useNavigation } from '@react-navigation/native';
import Back from '../../../components/back-button/Back';



const Nav = ({ navigationProps }) => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuicon} >
          
          <Back />
        </TouchableOpacity>
         <Image style={styles.logo} source={Logo}/>
         <TouchableOpacity>
           
         <MaterialCommunityIcons name='network-off-outline' color='#fff' size={20} />
         </TouchableOpacity>
      
    </View>
    </SafeAreaView>
  );
};

export default Nav;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#66C825',
    height: 80,
    paddingHorizontal: 10,
    borderBottomWidth:1,
    justifyContent: 'center',
    borderBottomColor:"#66C825",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",alignItems:"center"
  },
  logo:{
    width:140,
    height:20
  },
  notify:{
    position:"absolute",
    left:15,
    backgroundColor:"red",
   borderRadius:20,
   width:18,
   height:18,
   alignItems:"center",
   zIndex:1,
   bottom:15
  },
  notifytext:{
    color:'#fff',
    fontSize:10,
    fontFamily: 'Nunito_700Bold'

  },
  menuicon:{
    elevation:6,
    backgroundColor:"#fff",
    paddingHorizontal:8 ,
    paddingVertical:10,
    alignItems:'center',
    borderRadius:30
  }

});
