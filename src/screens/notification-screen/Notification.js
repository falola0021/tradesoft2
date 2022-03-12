import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Arrowback from '../../../assets/svgs/backShape';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../../App';
import moment from 'moment';
import { Checkbox } from 'react-native-paper';
import { showMessage, hideMessage } from 'react-native-flash-message';

const Notifications = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const app = useContext(AppContext);
  var getAllNotification = app.getAllNotification;
  var notification = app.notification;
  var readNotification = app.readNotification;
  var readAllNotification = app.readAllNotification;


  const [message, setMessage] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  

  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = React.useState(false);

  useEffect(() => {
    getAllNotification(setModalVisible, setMessage, setLoading);
  }, []);

  const handleSelected = (item) => {
    let notificationId = item.id;
    let notificationCopy = [...notification];
    notificationCopy?.map((item) => {
      if (item.id == notificationId) {
        setSelected(item.id); 
        readNotification(
          setModalVisible,
          setMessage,
          setLoading,
          notificationId,
          setSuccess,
          setErr
        );
      }
    });
  };

  const handleSelectAll = () => {
    readAllNotification(
          setModalVisible,
          setMessage,
          setLoading,
           setSuccess,
          setErr
        );
      
    
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
      <View style={styles.container}>
        <View style={styles.headerbox}>
          <TouchableOpacity onPress={handleBack}>
            <Arrowback />
          </TouchableOpacity>
          <Text style={styles.nottext}>Notifications</Text>
        </View>
        {
          loading?

        
        <ActivityIndicator size="25%" color="#c3c3c3" />:
<>

        <TouchableOpacity style={{marginBottom:10}} onPress={handleSelectAll} >
        <View style={styles.txt22}>
                  <Text style={ styles.time}>
                  
                  </Text>
                  <Text style={ styles.time}>
                    Mark all as read
                  </Text>
                  
                </View>
                </TouchableOpacity>
        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={{marginTop:30}}>
          {notification?.map((item) => (
            <TouchableOpacity
                onPress={() =>
                  item.read_at === null?
                  handleSelected(item):""
                }
              style={styles.headerbox3}
            >
              <View style={{ flex: 1 }}>
                
                <View style={styles.txt22}>
                  <Text style={item.read_at === null? styles.time: styles.time2}>
                    {moment(item.start_date).format('MM-DD-YY, h:mm:ss a')}
                  </Text>
                  <Checkbox
                    status={item.read_at != null ? 'checked' : 'unchecked'}
                    color={item.read_at === null? `#66C825`:"#A8A8A8"}
                    uncheckedColor={`#66C825`}
                  />
                </View>
                <Text style={ item.read_at === null?  styles.newclear22 : styles.newclear23}>{item.data.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
          </View>
        </ScrollView>
        </>
}
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
    height: '100%',
  },
  cancel: {
    width: 40,
    height: 40,
  },
  headerbox: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    //alignItems: 'center',
    marginBottom: 40,
  },
  headerbox2: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#66C825',
  },
  headerbox2a: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#66C825',
  },

  nottext: {
    color: '#66C825',
    fontSize: 20,
    fontFamily: 'GilroyBold',
  },
  new: {
    color: '#66C825',
    fontSize: 15,
    fontFamily: 'GilroyBold',

    fontWeight: '500',
  },

  headerbox3: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#66C825',
  },
  img4: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  txt22: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    // width:"60%",

    //flexWrap: 'wrap',
    // marginRight:10,

    //flexShrink: 1
  },
  new22: {
    color: '#000',
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
  },
  newclear22: {
    color: '#000',
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
  },
  newclear23: {
    color: '#A8A8A8',
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
  },
  time: {
    color: '#66C825',
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
  },
  time2: {
    color: '#A8A8A8',
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
  },
  
});


export default Notifications;


