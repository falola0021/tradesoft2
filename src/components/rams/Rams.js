import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Pic from '../../../assets/images/splash.png';
import { Checkbox } from 'react-native-paper';
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';

import AddRams from './AddRams';
import { showMessage, hideMessage } from 'react-native-flash-message';


import { Feather } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';

const Notes = ({ risks,id }) => {
  const [visible, setVisible] = React.useState(false);
  const [risk, setRisk] = React.useState(true);
  const [method, setMethod] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const { width } = useWindowDimensions();

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

  const source = {
    html: `
  <div >
    ${
      risks?.risk_method.map((item) => item.description)
      //risks?.risk_method[0]?.description
    }
  </div>`,
  };
  const customHTMLElementModels = {
    div: HTMLElementModel.fromCustomModel({
      tagName: 'div',
      mixedUAStyles: {
        fontSize: '12px',

        // alignSelf: 'center',
        // backgroundColor: 'blue'
      },

      contentModel: HTMLContentModel.block,
    }),

    p: HTMLElementModel.fromCustomModel({
      tagName: 'p',
      mixedUAStyles: {
        fontSize: '10px',
        color: 'rgba(46, 58, 89, 0.9)',
        fontFamily: 'Nunito_600SemiBold',
        // alignSelf: 'center',
        // backgroundColor: 'blue'
      },

      contentModel: HTMLContentModel.block,
    }),
    h2: HTMLElementModel.fromCustomModel({
      tagName: 'h2',
      mixedUAStyles: {
        fontSize: '14px',
        color: 'rgba(46, 58, 89, 0.9)',
        fontFamily: 'Nunito_800ExtraBold',

        // fontWeight:"bold",
        marginBottom: '12px',
        marginTop: '10px',
        color: '#66C825',

        // alignSelf: 'center',
        // backgroundColor: 'blue'
      },

      contentModel: HTMLContentModel.block,
    }),
  };

  const customHTMLElementModels2 = {
    p: HTMLElementModel.fromCustomModel({
      tagName: 'p',
      mixedUAStyles: {
        fontSize: 10,
        fontFamily: 'Nunito_600SemiBold',
        color: 'rgba(46, 58, 89, 0.7)',
      },

      contentModel: HTMLContentModel.block,
    }),
    h2: HTMLElementModel.fromCustomModel({
      tagName: 'h2',
      mixedUAStyles: {
        fontSize: '14px',
        color: 'rgba(46, 58, 89, 0.9)',
        fontFamily: 'Nunito_800ExtraBold',

        // fontWeight:"bold",
        marginBottom: '12px',
        marginTop: '10px',
        color: '#66C825',

        // alignSelf: 'center',
        // backgroundColor: 'blue'
      },

      contentModel: HTMLContentModel.block,
    }),
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
    <View style={{ height: '100%' }}>
      <View style={styles.riskbox}>
        <TouchableOpacity onPress={handleRisk} style={styles.risktab}>
          <View style={risk ? styles.checkwrapper : styles.checkwrapper2}>
            <View style={risk ? styles.check : styles.check2}></View>
          </View>
          <Text style={risk ? styles.riskname : styles.riskname2}>
            {' '}
            Method Statements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMethod} style={styles.risktab}>
          <View style={method ? styles.checkwrapper : styles.checkwrapper2}>
            <View style={method ? styles.check : styles.check2}></View>
          </View>
          <Text style={method ? styles.riskname : styles.riskname2}>
            Available Risks
          </Text>
        </TouchableOpacity>
      </View>
      {risk && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <RenderHtml
              contentWidth={width}
              source={source}
              customHTMLElementModels={customHTMLElementModels}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setChecked(!checked);
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              // onPress={() => {
              //   setChecked(!checked);
              // }}
              color={`#66C825`}
              uncheckedColor={`#66C825`}
            />
            <Text style={{ fontSize: 10, fontFamily: 'Nunito_600SemiBold' }}>
              I HAVE READ THE RISKS
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      {method && (
        <View style={{ flex: 1, height: '100%', paddingBottom: 30 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.btncotainer}>
              <TouchableOpacity onPress={handleAddNote} style={styles.btn}>
                <Text style={styles.btntxt}>Additional Risks</Text>
              </TouchableOpacity>
            </View>

            {risks?.project_risk.map((item) => (
              <View key={item.id} style={styles.sec1}>
                <View style={{ width: '100%', marginBottom: 10 }}>
                  <Text style={styles.txta}>WHAT ARE THE HAZARDS? :</Text>
                  <View style={{ width: '100%' }}>
                    <Text style={styles.txta1}>{item?.name}</Text>
                  </View>
                </View>
                <View style={{ width: '100%', marginBottom: 10 }}>
                  <Text style={styles.txta}>
                    WHO MIGHT BE HARMED AND HOW? :
                  </Text>
                  <View style={{ width: '100%' }}>
                    <Text style={styles.txta1}>{item?.description}</Text>
                  </View>
                </View>
                <View style={{ width: '100%', marginBottom: 10 }}>
                  <Text style={styles.txta}>HAT ARE YOU ALREADY DOING? :</Text>
                  <View style={{ width: '100%' }}>
                    <RenderHtml
                      contentWidth={width}
                      customHTMLElementModels={customHTMLElementModels2}
                      source={{
                        html: `
                         ${item.first_step}
                         `,
                      }}
                    />
                  </View>
                </View>
                <View style={{ width: '100%', marginBottom: 10 }}>
                  <Text style={styles.txta}>
                    WHAT FURTHER ACTION IS NECESSARY? :
                  </Text>
                  <View style={{ width: '100%' }}>
                    <RenderHtml
                      contentWidth={width}
                      customHTMLElementModels={customHTMLElementModels2}
                      source={{
                        html: `
                              ${item.second_step}
                         `,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F1E130',
                      paddingHorizontal: 30,
                      paddingVertical: 7,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={styles.txta}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      paddingHorizontal: 30,
                      paddingVertical: 7,
                      borderRadius: 10,
                      marginLeft: 20,
                    }}
                  >
                    <Text style={styles.txta2}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <AddRams setMessage={setMessage}
        setSuccess={setSuccess}
        setErr={setErr}  projectId={id} modalVisible={visible} setModalVisible={setVisible} />
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
    paddingBottom: 10,
    backgroundColor: 'red',
  },
  img: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 10,
  },
  txta: {
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    color: '#000',
  },
  txta2: {
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    color: '#fff',
  },
  txta1: {
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(46, 58, 89, 0.7)',
  },
  txtb: {
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(46, 58, 89, 0.7)',
  },
  sec1: {
    paddingTop: 15,
    width: '100%',
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 20,
    borderBottomColor: 'rgba(220,220,220,0.4)',
    borderBottomWidth: 1,
    marginTop: 10,
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
    // marginTop: 10,
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

export default Notes;
