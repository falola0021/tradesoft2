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


const Button = ({ text}) => {
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.doneContainer}>
        <View
        
          style={styles.donebutton}>
         
       { <Text style={styles.buttonText}>{text}</Text>}
        </View>
       
     
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
    backgroundColor: '#E0E0E9',
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
