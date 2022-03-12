import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import Calendar from '../../../assets/calendar.png';


const Password = ({
  setDob,
  dob,
  label,
  placeholder,
  err,
  minDate,
  maxDate,
}) => {
  const [hidePass, setHidePass] = useState(true);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [lab, setLab] = useState(false);
  const [labcol, setLabcol] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setLab(true)
    setLabcol(true);
   setDatePickerVisibility(true);
    
    };

  const hideDatePicker = (date) => {
   
    if(date){
      setLab(true),
      setLabcol(false);
    }else{
      setLab(false),
      setLabcol(false);
    }
    setDatePickerVisibility(false);
   
  };

  const handleConfirm = (date) => {
    
  
    const currentDate = date ;
    let dateConvert = moment(currentDate).format('YYYY-MM-DD');
  
    setDob(dateConvert);
   setDate(currentDate);

   hideDatePicker(date);
   
  };



const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
  },

  inputicon: {
    textAlign: 'right',
    paddingHorizontal: 20,
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#0130B0',
    borderRadius: 5,
    paddingVertical: 15,
  },
  datecalender: {
    width: 25,
    height: 25,
  },
  text: {
    textAlign: 'left',
    width: '100%',
    fontSize: 16,
    color: '#000',
  },
  confirmdate: {
    color: '#0130B0',
    fontFamily: 'Nunito_700Bold',
  },
  canceldate: {
    color: 'red',
    fontFamily: 'Nunito_700Bold',
  },
  placeholder: {
    fontSize: 15,
    color: 'gray',
    fontFamily: 'Nunito_600SemiBold',
  },
  textval: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Nunito_600SemiBold',
  },
  label: {
    backgroundColor: 'red',
    paddingHorizontal: 4,
    marginHorizontal: 10,
    position: 'absolute',
    top: -10,
    zIndex: 20,
    color: labcol ? 'grey' : 'grey',
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
    fontSize: 12,
  },
});


  return (
    <View>
      {dob ? (
        <View>
           {lab && <Text style={styles.label}>{placeholder}</Text>} 
        <TouchableOpacity
          style={styles.datePickerStyle}
          onPress={showDatePicker}
        >
          <Text style={styles.textval}>{dob}</Text>
          <Image style={styles.datecalender} source={Calendar} />
        </TouchableOpacity>
        </View>
      ) : (
        <View>
        {lab && <Text style={styles.label}>{placeholder}</Text>} 

        <TouchableOpacity
          style={styles.datePickerStyle}
          onPress={showDatePicker}
        >
          <Text style={styles.placeholder}>{placeholder}</Text>

          <Image style={styles.datecalender} source={Calendar} />
        </TouchableOpacity>
        </View>
    
      )}
        <DateTimePickerModal

        isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}

          minimumDate={minDate}
          maximumDate={maxDate}
          
          // value={date}
       
          // display='default'
          // onChange={onChange}
        />
     
    </View>
  );
};

export default Password;
