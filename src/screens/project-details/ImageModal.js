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

const handleNavigate = ({
  modalVisible2,
  setModalVisible2,
  projectDetails,
}) => {
  const close = () => {
    setModalVisible2(false);
  };

  return (
    <>
      <TouchableOpacity style={modalVisible2 && styles.overlay}>
        <View style={styles.centeredView}>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              setModalVisible2(!modalVisible2);
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
                    marginBottom: 10,
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

                <View>
                  <Image
                    style={styles.img}
                    source={{
                      uri: `http://portal.trade-soft.co.uk/${projectDetails?.project_info?.image_src}`,
                    }}
                  />
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
  img: {
    width: '100%',
    resizeMode: 'contain',
    height: '95%',
    borderRadius: 8,
  },
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
    textTransform: 'lowercase',
    marginTop: 30,
    marginBottom: 5,
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
  attachmentbox: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'rgba(46, 58, 89, 0.2)',
    borderWidth: 1,
    // marginTop:30,
    paddingVertical: 15,
    alignItems: 'center',
    // justifyContent:"center",
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  attachmenttext: {
    color: 'rgba(46, 58, 89, 0.7)',
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    marginLeft: 10,
  },
  attachmenttext2: {
    color: 'rgba(46, 58, 89, 0.7)',
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    marginLeft: 10,
  },
});
