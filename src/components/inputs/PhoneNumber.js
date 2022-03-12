import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
// import { TextInput } from 'react-native-paper';
import Flag from '../../../assets/svgs/flag';
import Arrow from '../../../assets/anchorright.png';

import PhoneInput from 'react-native-phone-number-input';

const Password = ({ icon, label, placeholder, val, setVal, err }) => {
  const [hidePass, setHidePass] = useState(true);
  const [lab, setLab] = useState(false);
  const [labcol, setLabcol] = useState(false);

  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef < PhoneInput > null;
  const [showlabel, setShowlabel] = useState(false);

  const handleFocus = () => {
    setShowlabel(true);
  };

  const styles = StyleSheet.create({
    box: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#0130B0',
      borderWidth: 1,
      borderRadius: 5,
      height: 58,
      paddingHorizontal: 8,
    },
    text: {
      fontSize: 15,
      fontFamily: 'Nunito_600SemiBold',
      color: '#012224',
    },
    input: {
      flex: 1,
      height: 58,
      borderWidth: 0,
      fontSize: 15,

      // fontFamily: 'Nunito_600SemiBold',

      marginLeft: 10,
      color: '#000',
      backgroundColor: 'transparent',
    },
    flag: {
      marginHorizontal: 10,
    },
    img: {
      width: 8,
      height: 15,
      marginLeft: 10,
      transform: [{ rotate: '90deg' }],
    },
    label: {
      backgroundColor: 'red',
      paddingHorizontal: 4,
      marginHorizontal: 10,
      position: 'absolute',
      top: -10,
      zIndex: 20,
      color: labcol ? 'grey' : '#0130B0',
      backgroundColor: '#F5F5F5',
      alignSelf: 'flex-start',
      fontSize: 12,
    },
  });

  return (
    <View>
      {lab && <Text style={styles.label}>Phone Number</Text>}
      <View style={styles.box}>
        <View style={styles.flag}>
          <Flag />
        </View>
        <Text style={styles.text}>+234</Text>
        <Image style={styles.img} source={Arrow} />
        <TextInput
          keyboardType='numeric'
          onFocus={() => {
            setLab(true), setLabcol(false);
          }}
          onBlur={() => setLabcol(true)}
          label={showlabel ? 'Phone Number' : ''}
          placeholderTextColor='#2E3A59'
          value={val}
          outlineColor={err && !val ? '#C81C1C' : '#0130B0'}
          onChangeText={(text) => {
            if(text.length>10){
              return
            }
            setVal(text)
          }}
          placeholder='Phone Number'
          style={styles.input}
          underlineColor='transparent'
        />
      </View>

      {/* <TextInput
          onFocus={handleFocus}
          mode=''
          label={showlabel ? 'Phone Number' : ''}
          placeholderTextColor='#2E3A59'
          value={val}
          onChangeText={(text) => setVal(text)}
          mode='outlined'
          direction='rtl'
          outlineColor={err && !val ? '#C81C1C' : '#0130B0'}
          paddingLeft='30%'
          style={styles.input}
          theme={{
            colors: {
              text: 'transparent',
              primary: '#0130B0',
              underlineColor: 'transparent',

              // placeholder: '#0130B0',
            },
          }}
        /> */}

      {/* <PhoneInput
          // ref={phoneInput}
          defaultValue={val}
          defaultCode='NG'
          onChangeFormattedText={(text) => {
            setVal(text);
            if (text.length > 3) {
              setShowlabel(true);
            } else {
              setShowlabel(false);
            }
          }}
          containerStyle={{
            width: '100%',
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 5,
          }}
          textInputStyle={{ color: '#000' }}
          codeTextStyle={{ color: '#000', display: 'none' }}
          flagButtonStyle={{ color: '#ffffff' }}
          textContainerStyle={{
            backgroundColor: 'transparent',
            borderRadius: 20,
            color: '#000',
            padding: 0,
          }}
          placeholder=''
          phoneInputContainer={true}
          textInputProps={{ placeholderTextColor: 'grey' }}
          // withDarkTheme
          // withShadow
          //autoFocus
        /> */}
    </View>
  );
};

export default Password;
