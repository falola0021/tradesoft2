import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  useFonts,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Button = ({ text, handleNavigate,loading,icon }) => {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.doneContainer}>
        <TouchableOpacity
          onPress={handleNavigate}
          style={loading?styles.unbutton:styles.donebutton}>
           {icon && <MaterialCommunityIcons
                name={icon}
            
                size={22}
                style={styles.icon}
           
              />}
       {  loading?     <ActivityIndicator size="large" color="#fff" />: <Text style={styles.buttonText}>{text}</Text>}
        </TouchableOpacity>
       
     
      </View>
    );
  }
};
// onPress={() => navigation.navigate("Profile")}
export default Button;

const styles = StyleSheet.create({
  doneContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  donebutton: {
    backgroundColor: '#66C825',
    paddingVertical: 17,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    alignItems:"center"
  },
  unbutton: {
    backgroundColor: '#B3BCCE',
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    alignItems:"center"
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'GilroyBold',
    fontSize: 15,
   
  },
  icon:{
    color:"#fff",
    marginRight:10,
    
  }
});
