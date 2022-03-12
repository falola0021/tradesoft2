import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import moment from 'moment';
import { AppContext } from '../../../App';
import { showMessage, hideMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Timer({details,location}) {
  const [clockInTime, setClockInTime] = React.useState('00:00:00');
  const [travelTime, setTravelTime] = React.useState('00:00:00');

  const [startClockIn, setStartClockIn] = React.useState(false);
  const [startTravel, setStartTravel] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [clockindetails, setClockindetails] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = React.useState(false);




  const app = useContext(AppContext);
  const  myaccountinfo = app. myaccountinfo;
  const  clockInOut = app.clockInOut;
  const  getClock = app.getClock;
  const  clockview = app.clockview;
 
  

  const tick = useRef();

  const handleGetClockView=()=>{
 
    let projectId=details.id
    getClock(setModalVisible,
      setMessage,
      setLoading,
      setSuccess,
      setErr,
      projectId,)
      setClockindetails(true)
  }
 


  const handleClockIn = () => {

   let lat=location? location?.coords?.latitude:0
   let lng=location? location?.coords?.longitude:0
   let projectId=details.id
    clockInOut(
      setModalVisible,
      setMessage,
      setLoading,
      setSuccess,
      setErr,
      projectId,
      lat,
      lng,)
    setStartClockIn(!startClockIn);
  };

  const handleGetClockinStatus =async () => {
   
    let clockinstatus = await AsyncStorage.getItem('clockinstatus')


    if(clockinstatus=="clockin"){
      
      setStartClockIn(!startClockIn);

    }

  }

  useEffect(() => {
    handleGetClockinStatus()
  }, [])



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


  useEffect(() => {
    if (startClockIn) {
      tick.current = setInterval(() => {
        setClockInTime(moment().format('LTS'));
      }, 1000);
    } else {
      setClockInTime('00:00:00');
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [startClockIn]);

  const handleTravelTime = () => {
    setStartTravel(!startTravel);
  };

  useEffect(() => {
    if (startTravel) {
      tick.current = setInterval(() => {
        setTravelTime(moment().format('LTS'));
      }, 1000);
    } else {
      setTravelTime('00:00:00');
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [startTravel]);

  const styles = StyleSheet.create({
    timerboxcount: {
      color: '#000',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Nunito_600SemiBold',
    },
    timerboxcountname: {
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    timerboxtitle: {
      backgroundColor: startClockIn ? '#F1E22E' : '#66C825',
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    timerboxname: {
      color: startClockIn ? '#000' : '#fff',
      fontSize: 12,
      fontFamily: 'Nunito_600SemiBold',
    },
    timerboxtitle2: {
      backgroundColor: startTravel ? '#F1E22E' : '#66C825',
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    timerboxname2: {
      color: startTravel ? '#000' : '#fff',
      fontSize: 12,
      fontFamily: 'Nunito_600SemiBold',
    },
    timerbox: {
      display: 'flex',
      flexDirection: 'row',
      borderColor: '#66C825',
      borderWidth: 1,
    },

    btncotainer: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    btn: {
      backgroundColor: '#66C825',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 6,
    },
    btntxt: {
      fontSize: 12,
      fontFamily: 'Nunito_600SemiBold',
      color: '#fff',
    },
    notebox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      paddingBottom: 15,
      borderBottomColor: 'rgba(220,220,220,0.4)',
      borderBottomWidth: 1,
    },
    img: {
      width: 35,
      height: 35,
      borderRadius: 50,
      marginRight: 10,
    },
    txta: {
      fontSize: 12,
      fontFamily: 'Nunito_600SemiBold',
      color: '#000',
    },
    txtb: {
      fontSize: 10,
      fontFamily: 'Nunito_600SemiBold',
      color: 'rgba(46, 58, 89, 0.7)',
    },
    sec1: {
      marginRight: 10,
      // width:"40%",
    },
    sec2: {
      width: '50%',
    },
    downloadbox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    download: {
      color: '#66C825',
      fontSize: 10,
      fontFamily: 'Nunito_600SemiBold',
    },
    riskbox: {
      marginBottom: 20,
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    risktab: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    riskname: {
      fontSize: 13,
      fontFamily: 'Nunito_600SemiBold',
      color: '#66C825',
    },
    checkwrapper: {
      width: 14,
      height: 14,
      backgroundColor: '#fff',
      borderRadius: 20,
      display: 'flex',
      borderWidth: 1,
      borderColor: '#66C825',
      justifyContent: 'center',
      marginRight: 10,
      alignItems: 'center',
    },
    check: {
      width: 8,
      height: 8,
      backgroundColor: '#66C825',
      borderRadius: 20,
    },
    riskname2: {
      fontSize: 13,
      fontFamily: 'Nunito_600SemiBold',

      color: 'rgba(46, 58, 89, 0.4)',
    },
    checkwrapper2: {
      width: 14,
      height: 14,
      backgroundColor: '#fff',
      borderRadius: 20,
      display: 'flex',
      borderWidth: 1,
      borderColor: 'rgba(46, 58, 89, 0.4)',
      justifyContent: 'center',
      marginRight: 10,
      alignItems: 'center',
    },
    check2: {
      width: 8,
      height: 8,
      backgroundColor: '#fff',
      borderRadius: 20,
    },
  });

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View style={styles.timerbox}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.timerboxtitle}
        >
          <Text style={styles.timerboxname}>
            {startClockIn ? 'Clock Out' : ' Clock In'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => startClockIn && handleGetClockView()} style={styles.timerboxcountname}>
          <Text style={styles.timerboxcount}>{clockInTime}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timerbox}>
        <TouchableOpacity
          onPress={handleTravelTime}
          style={styles.timerboxtitle2}
        >
          <Text style={styles.timerboxname2}>Start Travel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timerboxcountname}>
          <Text style={styles.timerboxcount}>{travelTime}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          onStartShouldSetResponder={() => setModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(225,225,225,0.5)',
          }}
        >
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: '#fff',
              elevation: 0.3,
              borderRadius: 6,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontFamily: 'Nunito_600SemiBold',
                fontSize: 14,
                color: '#000',
                textTransform:"capitalize"
              }}
            >
              Hi {myaccountinfo.first_name},{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito_600SemiBold',
                fontSize: 14,
                color: '#000',
              }}
            >
              You are about to clock {!startClockIn ? 'in' : 'out'} at
            </Text>
            <Text
              style={{
                marginTop: 50,
                textAlign: 'center',
                fontSize: 35,
                color: '#66C825',
              }}
            >
              {moment().format('HH:mm A')}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 70,
              }}
            >
              <TouchableOpacity
                onPress={handleClockIn}
                style={{
                  backgroundColor: !startClockIn ? '#66C825' : '#F1E22E',
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 6,
                  width: 120,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: !startClockIn ? '#fff' : '#000',
                    fontFamily: 'Nunito_600SemiBold',
                  }}
                >
                  Clock-{!startClockIn ? 'in' : 'out'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#E40101',
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 6,
                  width: 120,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{ color: '#fff', fontFamily: 'Nunito_600SemiBold' }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType='slide'
        transparent={true}
        visible={clockindetails}
        onRequestClose={() => {
          setClockindetails(!clockindetails);
        }}
      >
        <View
          onStartShouldSetResponder={() => setClockindetails(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(225,225,225,0.5)',
          }}
        >
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: '#fff',
              elevation: 0.3,
              borderRadius: 6,
              padding: 20,
            }}
          >
            
         
            <View style={{
                marginTop: 10,
                textAlign: 'center',
                fontSize: 30,
                color: '#66C825',
              }}>
                <Text
              style={{
             
                textAlign: 'center',
                fontSize: 15,
                color: '#000',
              }}
              >
                Clock-in Time
              </Text>
            <Text
              style={{
             
                textAlign: 'center',
                fontSize: 35,
                color: '#66C825',
              }}
            >
            {moment(clockview && clockview[0]?.clock_in_time).format('HH:mm A')}
            </Text>
            </View>
            <View style={{
                marginTop: 10,
                textAlign: 'center',
                fontSize: 35,
                color: '#66C825',
              }}>
                <Text
              style={{
             
                textAlign: 'center',
                fontSize: 15,
                color: '#000',
              }}
              >
                Current Time
              </Text>
            <Text
              style={{
             
                textAlign: 'center',
                fontSize: 35,
                color: '#66C825',
              }}
            >
            {moment().format('HH:mm A')}
            </Text>
            </View>
            <View style={{
                marginTop: 10,
                textAlign: 'center',
                fontSize: 35,
                color: '#66C825',
              }}>
                <Text
              style={{
             
                textAlign: 'center',
                fontSize: 15,
                color: '#000',
              }}
              >
                Duration
              </Text>
            <Text
              style={{
             
                textAlign: 'center',
                fontSize: 35,
                color: '#66C825',
              }}
            >
            {clockview && clockview[0]?.total_time_formatted}
            {/* {moment().format('HH:mm A')} */}
            </Text>
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
