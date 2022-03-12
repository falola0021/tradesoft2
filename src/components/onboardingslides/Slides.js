import React from 'react';
import AppLoading from 'expo-app-loading';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import {
  useFonts,
  Nunito_700Bold,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';

const Slide = ({ item }) => {
  const { Img, desc, title } = item;
  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View  style={[styles.slide]}>
        <View style={styles.img}>
     <Image source={Img} style={styles.imge} /> 

        {/* <Img/> */}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    );
  }
};
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  slide: {
    width,
    //height,
    //justifyContent: 'center',
    marginTop:"24%",
    alignItems: 'center',
    paddingHorizontal:20,
  
  },
  img: {
    marginBottom: 40,
  },
  imge:{
width:280,
height:280
  },
  title: {
    color: 'red',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#67C825',
  },
  desc: {
    color: 'red',
    fontSize: 15,
    color: '#0130B0',
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
    color: '#2E3A59',
  },
});

export default Slide;
