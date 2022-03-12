import React, { useState } from 'react';
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
import TextArea from '../../components/inputs/InputTextArea';
import {
  AntDesign
} from '@expo/vector-icons';
import { Value } from 'react-native-reanimated';
import * as DocumentPicker from "expo-document-picker";
import InactiveButton from '../../components/inactive-button/Button';


const handleNavigate = ({ modalVisible, setModalVisible,handleSendNote ,setFile}) => {
  const [val, setVal] = React.useState(null);
  const [docname, setDocname] = React.useState(null);
  const [docsize, setDocsize] = React.useState(null);
  const [docurl, setDocurl] = React.useState(null);
  const [doctype, setDoctype] = React.useState(null);



 
    const pickDocument = async () => {
     
      let result = await DocumentPicker.getDocumentAsync();
  
      setDocname(result.name)
      setDocsize(result.size)
      setDocurl(result.uri)
      setDoctype(result.mimeType)
     
      console.log(result.uri);
      console.log(result);
    };


  const close = () => {
    setModalVisible(false);
    setVal(null)
     
    setDocname(null)
    setDocsize(null)
    setDocurl(null)
  };

  const handleSubmit = () => {
   
    handleSendNote(val,docname,docsize,docurl,doctype)
setVal("")
    setModalVisible(false);
  
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
                <TextArea
                  placeholder='Enter your note here...'
                  label='Your Note'
                  val={val}
                  setVal={setVal}
                />

                <Text style={styles.bottomtxt2}>ALLOWED: JPEG, JPG, BMP, PNG, PDF, GIF, DOC, DOCX, ODT, CSV, ODS, XLS, XLSX, ZIP, TXT
</Text>

                 <TouchableOpacity onPress={pickDocument} style={styles.attachmentbox}>
                 <AntDesign
                  name='addfile'
                  color='#66C825'
                  size={15}
                />
                <View style={{display:"flex",flexDirection:"row"}}>
                   <Text style={styles.attachmenttext2}>{docname?docname.substring(0, 26):"Attatchment"}  </Text>
                   <Text style={styles.attachmenttext}>{docsize?(docsize * 0.000001).toFixed(2) + "Mb": " (128mb max-size)"}  </Text>

                   </View>
                 </TouchableOpacity>

                <View style={styles.bottomtxtbuttonbox}>
                  {/* <TouchableOpacity style={styles.btn1}>
               <Text style={styles.btntext2}>GO TO PROJECT</Text>
               </TouchableOpacity> */}
               {val ?
                  <TouchableOpacity onPress={handleSubmit} style={styles.btn2}>
                    <Text style={styles.btntext2}>Add Note</Text>
                  </TouchableOpacity>:
                  <InactiveButton text='Add Note' />
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
    height: 365,
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
    marginTop:30,
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
