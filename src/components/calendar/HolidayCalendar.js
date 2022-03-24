import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Cal = () => {
  const [items, setItems] = useState({});


  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{item.name}</Text>
              <Text style={{color:"green",fontSize:10}}>in progress</Text>
              {/* <Avatar.Text label='progress' size={30} style={{backgroundColor:"#F1E130"}} /> */}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        markingType={'period'}
        minDate='2012-05-16'
        maxDate='2012-05-17'
        markedDates={{
          '2012-05-16': {
            selected: true,
            marked: true,
            textColor: 'grey',
            color: '#F1E130',
          },
          '2012-05-17': {
            marked: true,
            selected: true,
            textColor: 'grey',
            color: '#F1E130',
          },
        }}
        items={{
          '2012-05-16': [{ name: 'Installing new bathrooms' }],
          '2012-05-17': [{ name: 'Fix broken kitchen pipes', height: 80 }],
        }}
        //  items={items}
        loadItemsForMonth={(month) => {
          console.log('trigger items loading');
        }}
        selected={'2012-05-16'}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Cal;

const styles = StyleSheet.create({});

