import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions,TouchableOpacity } from 'react-native';
import Indicators from '../../components/indicators/Indicators';
import Slide from '../../components/onboardingslides/Slides';
import { useFonts, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';
import RightArrow from '../../../assets/svgs/arrowShape';
import LeftArrow from '../../../assets/svgs/backShape';




const Welcome = ({ slides = [], onDone,handleLogin }) => {
 if (!slides || !slides.length) return null;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  const flatListRef = useRef();
  let [fontsLoaded]=useFonts({
    Nunito_600SemiBold,
})

  const onViewableItemsChanged = useRef(item => {
    const index = item.viewableItems[0].index;
    setCurrentSlideIndex(index);
  });

  const handlePrevious = () => {
    if (currentSlideIndex <= 0) return;

    flatListRef.current.scrollToIndex({ index: currentSlideIndex - 1 });
  };

  const handleNext = () => {
    if (currentSlideIndex >= slides.length - 1) return;
    flatListRef.current.scrollToIndex({ index: currentSlideIndex + 1 });
  };


   
  
  


  if(!fontsLoaded){
    return <AppLoading/>
}else{

  return (
    <>
    
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={slides}
        keyExtractor={item => item.key.toString()}
        renderItem={({ item }) => <Slide item={item} />}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <View style={styles.indicatorContainer}>
        <Indicators
          currentSlideIndex={currentSlideIndex}
          indicatorCount={slides.length}
        />
      </View>
      {currentSlideIndex > 0  && (
          <>
        <Text onPress={handlePrevious} style={[styles.button, styles.leftButton]}>
        <View style={styles.arrowww2}>
        <LeftArrow />
        </View>
          
          Previous
          </Text>
          
        </>
      )}
      {currentSlideIndex < slides.length - 1 ? (
        <Text onPress={handleNext} style={[styles.button, styles.rightButton]}>
          Next  
          <View style={styles.arrowww}>
        <RightArrow />
        </View>
        </Text>
      ):(
          <>
    <View style={styles.doneContainer}>
    <TouchableOpacity style={styles.donebutton} onPress={onDone}  >
     <Text  style={styles.buttonText}    >Get started</Text>
    </TouchableOpacity>
   
    </View>
     
    {/* <Text style={styles.bottomtext}>Already have an account? <Text onPress={handleLogin} style={styles.logintect}>Login</Text></Text> */}
    </>
    )}
    </>
  );
 }
};

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    width,
    bottom: "25%",
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    fontSize: 14,
    color: 'rgba(46, 58, 89, 0.7)',
    letterSpacing: 2,
    fontFamily:'Nunito_600SemiBold',

  },
  leftButton: {
    position: 'absolute',
    left: 30,
    bottom: "20%",

  },
  rightButton: {
    position: 'absolute',
    right: 30,
    bottom: "20%",
    
  },
  doneContainer:{
 justifyContent: 'center',
 flexDirection: 'row',
 bottom: "20%",
 paddingHorizontal:20

  },
  donebutton:{
     position: 'absolute',
  
    backgroundColor:"#67C825",
    paddingVertical:14,
    width:"94%",
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius:5
},
  buttonText:{
      color:"#fff",
      fontFamily:'Nunito_600SemiBold',
      fontSize:14
  },
  bottomtext:{
    bottom: "10%",
    justifyContent: 'center',
    flexDirection: 'row',
   textAlign:"center",
   fontFamily:'Nunito_600SemiBold',
  },
  logintect:{
    color:"#67C825",
  },
  arrowww:{
    paddingLeft:5,
   
    },
    arrowww2:{
      paddingRight:5,
      
      }
});

export default Welcome;
