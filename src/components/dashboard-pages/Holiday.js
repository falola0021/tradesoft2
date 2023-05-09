import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ImageBackground,
  ImageBackgroundBase,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
  Octicons,
  Entypo,
} from '@expo/vector-icons';
import Avatar from '../../../assets/images/avatar.png';
import { AppContext } from '../../../App';
import moment from 'moment';
import AddMessage from '../message/AddMessage';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import AddNewHoliday from '../holiday/AddNewHoliday';
import EditHoliday from '../holiday/EditHoliday';

import * as FileSystem from 'expo-file-system';

const Create = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible2, setModalVisible2] = React.useState(false);

  const app = useContext(AppContext);
  var getAllHolidays = app.getAllHolidays;
  var allholidays = app.allholidays;
  let getUsers = app.getUsers;
  let users = app.users;
  let getMessageDetails = app.getMessageDetails;
  let deleteHoliday = app.deleteHoliday;
  var updateHoliday = app.updateHoliday;
  var requestHoliday = app.requestHoliday;
  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [viewmessage, setViewmessage] = React.useState(false);
  const [activeindex, setActiveindex] = React.useState(false);
  const [success, setSuccess] = React.useState(null);
  const [conversationId, setConversationId] = React.useState(null);
  const [base64image, setBase64image] = React.useState(null);
  const [toggletab, setToggletab] = React.useState(true);
  const [toggletab1, setToggletab1] = React.useState(false);
  const [selectedhol, setSelectedhol] = React.useState(null);

  const [err, setErr] = React.useState(null);

  useEffect(() => {
    getAllHolidays(setModalVisible, setMessage, setLoading);
  }, []);

  const handleAddNewMessage = (item) => {
    setConversationId(item.id);

    setViewmessage(false);
    setModalVisible2(!modalVisible2);
  };

  const handleDeleteHoliday = (item) => {
    let id = item.id;

    deleteHoliday(
      setModalVisible,
      setMessage,
      setLoading,
      setSuccess,
      setErr,
      id
    );
  };

  const handleNewHoliday = async (val, title, startdate, enddate) => {
    let start = moment(startdate).format('DD-MM-YYYY');
    let end = moment(enddate).format('DD-MM-YYYY');

    console.log(typeof end, end);

    let body = {
      start_date: start,
      end_date: end,
      holiday_reason: val,
      id: '10',
    };

    requestHoliday(
      setModalVisible,
      setMessage,
      setLoading,
      setSuccess,
      setErr,
      body
    );
    setModalVisible2(false);
  };

  const handleUpdateHoliday = async (val, startdate, enddate, selectedhol) => {
    // var start;
    // var end ;
    // if(startdate || enddate){
    // var start=moment(startdate).format(
    //   'DD-MM-YYYY'
    // )
    // var end=moment(enddate).format(
    //   'DD-MM-YYYY'
    // )
    // }else{
    //   var start=moment(selectedhol.start_date).format(
    //     'DD-MM-YYYY'
    //   )
    //   var end=moment(selectedhol.end_date).format(
    //     'DD-MM-YYYY'
    //   )
    // }

    let id = selectedhol?.id;

    let body = {
      start_date: moment(startdate || selectedhol?.start_date).format(
        'DD-MM-YYYY'
      ),
      end_date: moment(enddate || selectedhol?.start_date).format('DD-MM-YYYY'),
      holiday_reason: val ? val : selectedhol?.holiday_reason,
      id: id,
    };

    updateHoliday(
      setModalVisible,
      setMessage,
      setLoading,
      setSuccess,
      setErr,
      body
    );
    setModalVisible(false);
  };

  const handleshowUpdate = (item) => {
    setSelectedhol(item);
    setModalVisible(!modalVisible);
  };

  if (err && message) {
    showMessage({
      message: 'ERROR',
      description: message,
      type: 'danger',
    });
    setMessage(false);
  }

  if (success && message) {
    showMessage({
      message: 'SUCCESS',
      description: message,
      type: 'success',
    });
    setMessage(false);
  }

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <Text style={styles.txt1b}>HOLIDAYS</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
          >
            <View style={styles.viewcontainer}>
              <View style={styles.buttoncontainer}>
                <TouchableOpacity
                  onPress={handleAddNewMessage}
                  style={styles.buttonbox}
                >
                  <Text style={styles.buttontext}>Request Holiday</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={allholidays}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      marginTop: 10,
                      backgroundColor: '#fff',
                      paddingHorizontal: 20,
                      paddingBottom: 15,
                      paddingTop: 10,
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      ></View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Nunito_600SemiBold',
                          fontSize: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: '#65C825',
                            fontFamily: 'Nunito_600SemiBold',
                            fontSize: 12,
                          }}
                        >
                          Reason :{' '}
                        </Text>
                        {item.holiday_reason}
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Nunito_600SemiBold',
                          fontSize: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: '#65C825',
                            fontFamily: 'Nunito_600SemiBold',
                            fontSize: 12,
                          }}
                        >
                          Start Date :{' '}
                        </Text>
                        {moment(item?.start_date).format('MM-DD-YY, h:mm:ss a')}
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Nunito_600SemiBold',
                          fontSize: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: '#65C825',
                            fontFamily: 'Nunito_600SemiBold',
                            fontSize: 12,
                          }}
                        >
                          End Date :{' '}
                        </Text>
                        {moment(item?.end_date).format('MM-DD-YY, h:mm:ss a')}
                      </Text>
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Nunito_600SemiBold',
                          fontSize: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: '#65C825',
                            fontFamily: 'Nunito_600SemiBold',
                            fontSize: 12,
                          }}
                        >
                          Total Days :{' '}
                        </Text>
                        {item.total_days} (days)
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          color:
                            item.leave_status_info == 'Pending'
                              ? 'orange'
                              : item.leave_status_info == 'Approved'
                              ? '#65C825'
                              : 'red',
                          fontFamily: 'Nunito_600SemiBold',
                          fontSize: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: '#65C825',
                            fontFamily: 'Nunito_600SemiBold',
                            fontSize: 12,
                          }}
                        >
                          Status :{' '}
                        </Text>
                        {item.leave_status_info}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => handleshowUpdate(item)}
                        >
                          <Text
                            style={{
                              fontFamily: 'Nunito_600SemiBold',
                              fontSize: 12,
                              color: 'grey',
                            }}
                          >
                            Edit Message
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDeleteHoliday(item)}
                        >
                          <Text
                            style={{
                              fontFamily: 'Nunito_600SemiBold',
                              fontSize: 12,
                              color: 'red',
                              marginLeft: 20,
                            }}
                          >
                            Delete{' '}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <EditHoliday
        selectedhol={selectedhol}
        users={users}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleUpdateHoliday={handleUpdateHoliday}
      />
      <AddNewHoliday
        users={users}
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        handleNewHoliday={handleNewHoliday}
      />
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,

    height: '100%',
  },

  txt1b: {
    color: '#2E3A59',

    fontSize: 16,
    fontFamily: 'Nunito_800ExtraBold',
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  viewcontainer: {},
  buttoncontainer: {
    alignItems: 'flex-end',
    marginTop: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonbox: {
    backgroundColor: '#65C825',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 7,
  },
  buttontext: {
    color: '#fff',
    fontFamily: 'Nunito_600SemiBold',
  },
  avatar: {
    height: 20,
    width: 20,
    borderRadius: 50,
    marginRight: 5,
  },
});
