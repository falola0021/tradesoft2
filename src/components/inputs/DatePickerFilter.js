import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  useFonts,
  Nunito_700Bold,
  Nunito_400Regular,
} from '@expo-google-fonts/nunito';
const Password = ({ icon, label, placeholder,val,setVal,err }) => {
  // const [text, setText] = React.useState('');
  const [hidePass, setHidePass] = useState(true);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    var a=moment(currentDate).format('YYYY-MM-DD')
    setDate(currentDate);

 
    
  
    setVal(a);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  let [fontsLoaded] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <TextInput
          showSoftInputOnFocus={false}
          mode=''
          label={label}
          placeholderTextColor='#fff'
          placeholder={placeholder}
          color="#fff"
          value={val}
        
          onChangeText={(text) => setVal(text)}
          mode='outlined'
          direction='rtl'
          outlineColor={err && !val ?"#C81C1C": '#fff'}
          style={styles.input}
          theme={{
            colors: {
              primary: '#0130B0',
              underlineColor: 'transparent',
              background:"transparent",
              text:"#fff",
             
            },
          }}
        />
        <FontAwesome
          name={icon}
          size={15}
          color='#fff'
          onPress={() => setHidePass(!hidePass)}
          style={styles.inputicon}
        />
        <View>
          <TouchableOpacity
            onPress={showDatepicker}
            style={styles.datebox}
          ></TouchableOpacity>

          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour={false}
               color="white"
              display='default'
              onChange={onChange}
            />
          )}
        </View>
      </View>
    );
  }
};

export default Password;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color:"red"

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
    color:"white",
    paddingVertical: 27,
  
  },
});
