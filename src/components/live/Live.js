import React, { useState, useEffect, useRef } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import {
  FontAwesome,
  
} from '@expo/vector-icons';

import AddExpenses from './AddExpenses';
import Clockin from '../../components/clockin-system/Timer';

import Map from './Map';
import * as Location from 'expo-location';


const Notes = ({details,projectDetails}) => {
  const [visible, setVisible] = React.useState(false);
  const [risk, setRisk] = React.useState(true);
  const [method, setMethod] = React.useState(false);
  const [modalVisible1, setModalVisible1] = React.useState(false);

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();
}, []);

let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location);
 
}



  const handleRisk = () => {
    setRisk(true);
    setMethod(false);
  };
  const handleMethod = () => {
    setRisk(false);
    setMethod(true);
  };

  const handleAddNote = () => {
    setVisible(true);
  };

  return (
    <View>
       <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}
      >
        <View >
        <TouchableOpacity onPress={()=>setModalVisible1(false)} style={{position:"absolute",top:40,zIndex:10,left:20}} >
<FontAwesome name='minus-circle' color='grey' size={35} />
</TouchableOpacity>
        <Map projectDetails={projectDetails}  location={location}/>
        </View>
      </Modal>
      <TouchableOpacity onPress={()=>setModalVisible1(true)} style={{position:"absolute",top:120,zIndex:10,left:15}} >
      {risk && <FontAwesome name='plus-circle' color='grey' size={35} />}
</TouchableOpacity>
      <View style={styles.riskbox}>
        <TouchableOpacity onPress={handleRisk} style={styles.risktab}>
          <View style={risk ? styles.checkwrapper : styles.checkwrapper2}>
            <View style={risk ? styles.check : styles.check2}></View>
          </View>
          <Text style={risk ? styles.riskname : styles.riskname2}>
            Time Tracking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMethod} style={styles.risktab}>
          <View style={method ? styles.checkwrapper : styles.checkwrapper2}>
            <View style={method ? styles.check : styles.check2}></View>
          </View>
          <Text style={method ? styles.riskname : styles.riskname2}>
            Material Expenses
          </Text>
        </TouchableOpacity>
      </View>
      {risk && (
      
        <View >
          <Clockin location={location} details={details} />
         
          <View style={{  marginTop: 20, marginBottom: 20,height:"100%" }}>
            
           <Map projectDetails={projectDetails}  location={location} /> 
           </View>
         
        
        </View>
      
      )}
      {method && (
        <View>
          
          <View style={styles.btncotainer}>
            <TouchableOpacity onPress={handleAddNote} style={styles.btn}>
              <Text style={styles.btntxt}>Add Expenses</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.notebox}>
              <View style={styles.sec1}>
                <Text style={styles.txta}>This feature was not discussed</Text>
              </View>
            </View>
          </View>
          <View></View>
        </View>
      )}

      <AddExpenses  modalVisible={visible} setModalVisible={setVisible} />
    </View>
  );
};
const styles = StyleSheet.create({
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
    // height: '100%',
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

export default Notes;
