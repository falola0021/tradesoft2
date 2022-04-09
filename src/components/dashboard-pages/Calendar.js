import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GeneralCalendar from "../calendar/GeneralCalendar"

const Calendar = () => {
  return (
    <View style={{flex:1}}>
        
        <Text style={styles.txt1b}>CALENDAR</Text>
      <GeneralCalendar/>
           </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
    txt1b: {
        color: '#2E3A59',
    
        fontSize: 16,
        fontFamily: 'Nunito_800ExtraBold',
        marginTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 20,
        marginBottom:20
      },
})