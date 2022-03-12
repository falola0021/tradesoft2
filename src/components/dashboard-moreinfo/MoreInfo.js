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
import Logo from "../../../assets/images/logo.png"
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';



const handleNavigate = ({
  modalVisible,
  setModalVisible,
  details
 
}) => {
  const navigation = useNavigation();

    const close=()=>{
        setModalVisible(false)
    }


    const handleNavigateToDetails = () => {
      setModalVisible(false)

      navigation.navigate('ProjectDetails',{details})
    };
  return (
      <>
    <TouchableOpacity
 

    style={modalVisible && styles.overlay}

    
    >
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
                <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%",alignItems:"center"}}>
                <View  style={styles.logobox}>
                <Image style={styles.logo} source={Logo}/>
                </View>
                <TouchableOpacity style={{backgroundColor:"#808080",height:30,width:30,borderRadius:20,alignItems:"center",}}    onPress={close}
>
                <Text style={{fontSize:17,color:"#fff"}}>x</Text>
                </TouchableOpacity>
                </View>
              
             <View style={styles.titlebox}>
               <Text style={styles.bottomtxt3}>Project: </Text>
               <Text style={styles.bottomtxt2}>{details?.name}</Text>
             </View>
             <View style={styles.titlebox}>
               {/* <Text style={styles.bottomtxt3}>Address: </Text> */}
               <Text style={styles.bottomtxt2}>{details?.address.address_line_1}, {details?.address.county}, {details?.address.country}</Text>
             </View>
             <View style={styles.titlebox}>
               <Text style={styles.bottomtxt3}>Task: </Text>
               <Text style={styles.bottomtxt2}>No task from API</Text>
             </View>
             <View style={styles.titlebox}>
               <Text style={styles.bottomtxt3}>Start Date: </Text>
               <Text style={styles.bottomtxt2}>
                 {moment(details?.start_date).format(
                            'MM-DD-YY, h:mm:ss a'
                          )}</Text>
             </View>
             <View style={styles.titlebox}>
               <Text style={styles.bottomtxt3}>End Date: </Text>
               <Text style={styles.bottomtxt2}> {moment(details?.end_date).format(
                            'MM-DD-YY, h:mm:ss a'
                          )}</Text>
             </View>
             <View style={styles.titlebox}>
               <Text style={styles.bottomtxt3}>Postcode: </Text>
               <Text style={styles.bottomtxt2}>{details?.address.postcode}</Text>
             </View>
             <View style={styles.bottomtxtbuttonbox}>
               <TouchableOpacity onPress={handleNavigateToDetails} style={styles.btn1}>
               <Text style={styles.btntext2}>GO TO PROJECT</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.btn2}>
               <Text style={styles.btntext2}>MARK AS COMPLETE</Text>
               </TouchableOpacity>
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
    height: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logobox:{
      backgroundColor:"#8a8a8a",
      flexShrink:1
      
  },
  logo:{
    //   width:180,
    //   height:25

    width      : 100,
    resizeMode : 'contain',
    height     : 15
  },
  titlebox:{
    display:"flex",
    flexDirection:"row",
    marginTop:10,
    flexWrap:"wrap"
  },
  bottomtxt2: {
    color: 'rgba(46, 58, 89, 0.7)',
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    
  },
  bottomtxt3: {
    color: '#2E3A59',
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
  },
  bottomtxtbuttonbox:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:30

  },
  btn1:{
    backgroundColor:'#66C825',
    width:140,
    height:37,
    borderRadius:7,
    alignItems:"center",
    justifyContent:"center"
  },
  btn2:{
    backgroundColor:'#F1E22E',
    width:140,
    height:37,
    borderRadius:7,
    alignItems:"center",
    justifyContent:"center"

  },
  btntext2:{
    color:"#000",
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    marginBottom:2,

  }
});
