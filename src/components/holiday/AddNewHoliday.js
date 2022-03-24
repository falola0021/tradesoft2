import React, { useState,useRef } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  
  //Animated
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import TextArea from '../inputs/InputTextArea';
import DatePicker from "../inputs/DatePicker"
import {
  AntDesign
} from '@expo/vector-icons';
import { Value } from 'react-native-reanimated';
import * as DocumentPicker from "expo-document-picker";
import InactiveButton from '../inactive-button/Button';
import MultiSelect from 'react-native-multiple-select';
import moment from 'moment';


const handleNavigate = ({ modalVisible, setModalVisible,handleNewHoliday}) => {
  const [val, setVal] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [enddate, setEnddete] = React.useState('');
  const [startdate, setStartdate] = React.useState('');


  const [maxdate, setMaxdate] = React.useState(new Date(moment().add(150, "years")));
  const [mindate, setMindate] = React.useState(new Date(moment().add(1, "day")));


 

  const close = () => {
    setModalVisible(false);
    setVal(null)
    setTitle(null)
    setStartdate("")
    setEnddete("")
  };

  const handleSubmit = () => {
  
    handleNewHoliday(val,title,startdate,enddate)   
    setVal(null)
    setTitle(null)
    setStartdate("")
    setEnddete("")
    
 
  };
  return (
    <>
      <TouchableOpacity style={modalVisible && styles.overlay}>
        <View style={styles.centeredView}>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <View style={styles.logobox}>
                    <Image style={styles.logo} source={Logo} />
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#808080',
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      alignItems: 'center',
                    }}
                    onPress={close}
                  >
                    <Text style={{ fontSize: 17, color: '#fff' }}>x</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.titlebox}>
                  {/* <Text style={styles.bottomtxt2}>135, Brierley Hill, Dudley, West Midlands, SY3 3NH, AL</Text> */}
                </View>

               


              <Text style={{marginTop:20,marginBottom:10,fontFamily: 'Nunito_600SemiBold',}}>Enter your holiday request details</Text>
                <View style={{marginBottom:20}}>
                <DatePicker
           
                 setDob={setStartdate}
                 dob={startdate}
                minDate={mindate}
                 
                  placeholder='Start date'
                 />
                </View>
       

                <View style={{marginBottom:15}}>
                <DatePicker
           
                 setDob={setEnddete}
                 dob={enddate}
                minDate={mindate}
                 
                  placeholder='End date'
                 />
                </View>
                <TextArea
                  placeholder='Enter your message here...'
                  label='Your Reason'
                  val={val}
                  setVal={setVal}
                />


                

                <View style={styles.bottomtxtbuttonbox}>
               
        
                {val && startdate && startdate ?
                  <TouchableOpacity onPress={handleSubmit} style={styles.btn2}>
                    <Text style={styles.btntext2}>Send Request</Text>
                  </TouchableOpacity>:
                  <InactiveButton text='Send Request' />
               }
             
       
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default handleNavigate;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(80, 80,80,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',

    borderRadius: 7,
    padding: 20,
    // height: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logobox: {
    backgroundColor: '#8a8a8a',
    flexShrink: 1,
  },
  logo: {
    //   width:180,
    //   height:25

    width: 100,
    resizeMode: 'contain',
    height: 15,
  },
  titlebox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  bottomtxt2: {
    color: 'rgba(46, 58, 89, 0.7)',
    fontSize: 8,
    fontFamily: 'Nunito_600SemiBold',
    textTransform:"lowercase",
    marginTop:15,
    marginBottom:5
  },
  bottomtxt3: {
    color: '#2E3A59',
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
  },
  bottomtxtbuttonbox: {
    // display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  btn1: {
    backgroundColor: '#66C825',
    width: 150,
    height: 37,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn2: {
    backgroundColor: '#F1E22E',
    width: '100%',
    height: 45,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntext2: {
    color: '#000',
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 2,
  },
  attachmentbox:{
    display:"flex",
    flexDirection:"row",
    borderColor:"rgba(46, 58, 89, 0.2)",
    borderWidth:1,
    // marginTop:30,
    paddingVertical:15,
    alignItems:"center",
    // justifyContent:"center",
    borderRadius:5,
    paddingHorizontal:20
  },
  attachmenttext:{
    color: 'rgba(46, 58, 89, 0.7)',
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    marginLeft:10
  },
  attachmenttext2:{
    color: 'rgba(46, 58, 89, 0.7)',
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    marginLeft:10
  }
});