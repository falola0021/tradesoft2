import React from 'react'
import { StyleSheet, Image, View,TouchableOpacity, Touchable } from 'react-native'
import Arrowback from '../../../assets/svgs/backShape';
import { useNavigation } from '@react-navigation/native'

const Back = () => {
  const navigation = useNavigation()

  return (
<TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack():()=>{}}>
    <View  style={styles.arrowbox}>
<Arrowback />
      {/* <Image style={styles.arrow} source={LeftArrow} /> */}
    </View>
</TouchableOpacity>
  )
}

export default Back

const styles = StyleSheet.create({
  // arrow: {
  //   width: 70,
  //   height: 70
  // }

})
