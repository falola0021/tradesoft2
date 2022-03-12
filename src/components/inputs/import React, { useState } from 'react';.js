import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Platform,Button, Touchable,Image} from 'react-native';
import { TextInput } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import  moment from "moment";


import DateTimePicker from '@react-native-community/datetimepicker';


import { FontAwesome5 } from '@expo/vector-icons';

import Calendar from "../../../assets/calendar.png"


const Password = ({ setDob,dob, label, placeholder ,err,minDate,maxDate}) => {

  const [hidePass, setHidePass] = useState(true);


  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    let b=moment(currentDate).format('YYYY-MM-DD')
    console.log(b)
     setDob(currentDate);
     setDate(currentDate);

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };



    return (
      <View>

<View>
       <TouchableOpacity  onPress={()=>showDatepicker()} style={styles.inputbox} >
         <Text style={styles.text}>{dob?dob : placeholder}</Text>
         <Image  style={styles.inputicon} source={Calendar}/>
       </TouchableOpacity>
      
        {/* <FontAwesome5
          name='calendar'
          size={15}
          color='#0130B0'
           style={styles.inputicon}
        /> */}
      </View>


      {/* <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View> */}
{/* 
     <TextInput
          placeholder={placeholder}
          placeholderTextColor='#2E3A59'
          value={dob}
          
          onFocus={() => alert("hii")}
           onChangeText={(text) => 
            console.log("hi")
            // alert("ki")
            // setEmail(text)
          }
          mode='outlined'
          direction='rtl'
          outlineColor={err && !dob ?"#C81C1C": '#0130B0'}
          style={styles.input}
          theme={{ colors: { primary: '#0130B0', underlineColor: 'transparent' } }} />
       */}
   
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"

          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          // value={date}
          // mode={mode}
          //  dateFormat='YYYY-MM-DD'
          // display="default"
          // onChange={onChange}
        />
      )}
    </View>

/* <DatePicker
       
          style={styles.datePickerStyle}
          date={dob}
          mode="date"
          placeholder={placeholder}
          format="YYYY-MM-DD"
          minDate={minDate}
          maxDate={maxDate}
          confirmBtnText="Confirm Selection"
        
          cancelBtnText="Cancel"
          iconSource={Calendar}
          
       
          customStyles={{
          
            dateIcon: {
              position: 'absolute',
              right: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
               borderColor:err && !dob ? "#C81C1C":"#0130B0",
              // outlineColor={err && !email ?"#C81C1C": '#0130B0'}
              alignItems: "flex-start",
              borderWidth: 0,
              borderWidth: 1,
              height:58,
              borderRadius:5,
              paddingHorizontal:10,
           
            },
            placeholderText: {
              // fontFamily: 'Nunito_700Bold',
              fontSize: 15,
              color: "gray",
              fontWeight:"400"
           
            },
            dateText: {
              fontSize:15,
              fontWeight:"500"
            }
          }}
          onDateChange={(date) => {
            setDob(date);
          }}
        
        /> */

    
  

  
    );
  }


export default Password;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
  },

  inputicon: {
    textAlign: 'right',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: 1,
  },
  datebox: {
    position: 'absolute',
    bottom: 2,
    width: '100%',

    paddingVertical: 27,
    // opacity:0
  },


  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  datePickerStyle: {
    width: "100%",
  
 
  },
  text: {
    textAlign: 'left',
    width: "100%",
    fontSize: 16,
    color : "#000"
  },
  confirmdate:{
    color:'#0130B0',
    fontFamily: 'Nunito_700Bold',

  },
  canceldate:{
    color:'red',
    fontFamily: 'Nunito_700Bold',

  },
  input: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold'
  },

  inputbox: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    borderColor:"#0130B0",
    borderWidth:1,
    paddingHorizontal:15,
    borderRadius:5,
    justifyContent:"space-between",
    display:"flex",
    flexDirection:"row",
    height:60,
    alignItems:"center"
  },
  text:{
    fontFamily: 'Nunito_400Regular',
   color:"#2E3A59",
   fontWeight:"600",
   color:"#2E3A59",
   fontSize:15
  

  },

  inputicon: {
  width:30,
  height:30

  },

});
