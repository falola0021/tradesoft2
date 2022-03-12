import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const App = ({loading}) => (
    
 
    <>
    {loading &&
      <View style={[styles.container, styles.horizontal]}>
   
  
    <ActivityIndicator size="35%" color="#c3c3c3" />
  </View>
   }
  </>

);

const styles = StyleSheet.create({
  container: {
position:"absolute",
 alignItems:"center",
 
   backgroundColor:"rgba(104, 124, 122,0.8)",
   height:"100%",
   width:"100%",
   top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  },
  horizontal: {
    
  },
});

export default App;