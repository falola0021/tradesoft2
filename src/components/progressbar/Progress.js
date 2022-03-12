import { Animated, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Progress = ({step,steps,height}) => {
    const animatedValue=React.useRef(new Animated.Value(-1000)).current
    const reactive=React.useRef(new Animated.Value(-1000)).current
    const [width,setWidth]=React.useState(0)

    React.useEffect(()=>{
Animated.timing(animatedValue,{
    toValue:reactive,
    duration:300,
    useNativeDriver:true
}).start()
    },[])


    React.useEffect(()=>{
        reactive.setValue( - width + (width * step/steps)
     
    )},[step,width])



    const styles = StyleSheet.create({
        container:{
            height:height,
            backgroundColor:"rgba(0,0,0,0.1)",
            borderRadius:height,
            overflow:"hidden"
        },
        innercontainer:{
            height:height,
            backgroundColor:"rgba(0,0,0,0.5)",
            borderRadius:height,
            width:"100%",
            position:"absolute",
            left:0,
            top:0,
            transform:[
                {
                    translateX:animatedValue
                }
            ]
        },
        ptext:{
            marginBottom:8
        }
    })

  return (
      <>

      <Text style={styles.ptext}>
      {step}/{steps}
  
      </Text>
    <View onLayout={e=>{
        const newwidth=e.nativeEvent.layout.width
        setWidth(newwidth)
    }}  style={styles.container}>
        <Animated.View style={styles.innercontainer}/>
        
    </View>
    </>
  )
}

export default Progress

