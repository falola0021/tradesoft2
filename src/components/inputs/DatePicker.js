import { View, Text, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import DatePicker from 'react-native-date-ranges';

const DatePicker1 = ({ setStartdate, setEnddete }) => {
  const customButton = (onConfirm) => (
    <TouchableOpacity
      style={{
        backgroundColor: '#65C825',
        width: '90%',
        alignItems: 'center',
        padding: 14,
        borderRadius: 7,
      }}
      onPress={onConfirm}
    >
      <Text style={{ color: '#fff', fontSize: 14 }}>
        Confirm date selection
      </Text>
    </TouchableOpacity>
  );
  return (
    <DatePicker
      style={{
        backgroundColor: 'rgba(80,80,80,0.03)',
        borderRadius: 5,
        borderWidth: 0.8,
      }}
      customStyles={{
        placeholderText: { fontSize: 14 },
        headerStyle: {
          backgroundColor: '#65C825',
        },
        headerMarkTitle: { fontSize: 16, color: '#ffffff', marginBottom: 10 },
        headerDateTitle: { fontSize: 14 },
        contentText: { fontSize: 14 },
        placeholderText: {
          fontSize: 14,
          color: 'rgb(80,80,80)',
          marginLeft: -155,
        }, // placeHolder style
      }}
      placeholder={'Start Date → End Date'}
      mode={'range'}
      selectedBgColor='#F1E22E'
      selectedTextColor='#000'
      markText='Select your holiday date range'
      customButton={customButton}
      blockBefore={true}
      onConfirm={(value) => {
        setStartdate(value.startDate);
        setEnddete(value.endDate);
      }}
    />
  );
};

export default DatePicker1;
