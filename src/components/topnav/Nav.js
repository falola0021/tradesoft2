import React, { useState,useEffect,useContext } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Logo from "../../../assets/images/logo.png"
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../App';


const Nav = ({ navigationProps }) => {
  const navigation = useNavigation();
  

  const handleNotification=()=>{
navigation.navigate("NotificationScreen")
  }

  const app = useContext(AppContext);
  var  getNotificatiobCount = app.getNotificatiobCount;
  const  notificationCount = app.notificationCount;
  const [message, setMessage] = React.useState(null);
  const [modalVisible ,setModalVisible] = React.useState(false);

  const [loading ,setLoading] = React.useState(false);
 
  useEffect(() => {
    getNotificatiobCount(setModalVisible,setMessage,setLoading)
  }, [])

  
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuicon} onPress={navigationProps.toggleDrawer}>
        <MaterialCommunityIcons name='menu' color='#fff' size={33} />
        </TouchableOpacity>
         <Image style={styles.logo} source={Logo}/>
         <TouchableOpacity onPress={handleNotification}>
           {notificationCount>0 &&
           <View style={styles.notify} >
             <Text style={styles.notifytext}>{notificationCount}</Text>
           </View>
}
         <MaterialCommunityIcons name='bell-outline' color='#fff' size={30} />
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
    elevation:6
  }

});
