import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Arrowback from '../../../components/back-button/Back';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '../../../../assets/images/avatar.png';
import Notes from '../../../components/notes/Notes';
import Rams from '../../../components/rams/Rams';
import Calendar from '../../../components/calendar/Calendar';
import Live from './clockins';
import Tasks from './task';
import AsyncStorage from '@react-native-async-storage/async-storage';



import moment from 'moment';
import ImageModal from "./ImageModal"
import { AppContext } from '../../../../App';

import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
  Octicons,
  Entypo,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  Fontisto,
} from '@expo/vector-icons';
import { set } from 'react-native-reanimated';

const Notifications = ({ route }) => {
  const { details,longitude,latitude } = route.params;
  const navigation = useNavigation();
  const [note, setNote] = React.useState(false);
  const [rams, setRams] = React.useState(false);
  const [calendar, setCalendar] = React.useState(false);
  const [live, setLive] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [modalVisible2, setModalVisible2] = React.useState(false);


  const [errorMsg, setErrorMsg] = useState(null);

  const handleToggleImage = () => {
    setModalVisible2(!modalVisible2)
  };

  const handleNote = () => {
    setLive(false);
    setNote(true);
    setRams(false);
    setCalendar(false);
   
  };
  const handleRams = () => {
    setLive(false);
    setNote(false);
    setRams(true);
    setCalendar(false);
   

  };
  const handleCalendar = () => {
    setLive(false);
    setNote(false);
    setRams(false);
    setCalendar(true);
   

  };
  const handleLive = () => {
    setLive(true);
    setNote(false);
    setRams(false);
    setCalendar(false);
   

  };

  const app = useContext(AppContext);
  var projectDetails = app.projectDetails;
  var getProjectsDetails = app.getProjectsDetails;
  var getRisk = app.getRisk;
  var risk = app.risk;
  var getAllTask = app.getAllTask;
  var  alltask = app. alltask;




  const [tasksoff, setTaskoff] = React.useState(null);




 const getOfflineTask=async()=>{
  
    const offlinetask = await AsyncStorage.getItem('offlinetask');
 
  
  
  if (offlinetask !== null){
   const parsedofflinetask = JSON.parse(offlinetask);
setTaskoff( tasksoff=> parsedofflinetask?.filter((item) => item.project_id == details.id));

    
  }
}





 


  useEffect(() => {
    // getOffliveliveprojects()
    getOfflineTask()
 
  }, []);


  

 


  return (
<ScrollView showsVerticalScrollIndicator={false}>

    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerbox}>
          <Arrowback />
          <Text style={styles.nottext}>Project Overview</Text>
        </View>
        
        <View style={styles.detailspage}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.title}>
              {details?.name}{' '}
            </Text>
            <TouchableOpacity
              onPress={handleToggleImage}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#66C825', marginRight: 5 }}>
               Image
              </Text>
              <Feather name='image' color='#66C825' size={16} />
            </TouchableOpacity>
          </View>
       
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={styles.titleb}>Description: </Text>
                <Text style={styles.address}>
                  {details?.description != ''
                    ? details?.description
                    : 'No project description'}{' '}
                </Text>
              </View>

              <Text style={styles.titleb}>Address:</Text>

              <View style={{ marginBottom: 4 }}>
                <View>
                  <Text style={styles.address}>
                    {' '}
                    {
                      details?.address
                        ?.address_line_1
                    }{' '}
                  </Text>
                  { details?.address
                        ?.address_line_2 != '' && (
                    <Text style={styles.address}>
                      {' '}
                      {
                       details?.address
                       ?.address_line_2
                      }{' '}
                    </Text>
                  )}
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}
              >
                <View>
                  <Text style={styles.address}>
                    Postcode:{' '}
                    {
                   details?.address
                        ?.postcode
                    }{' '}
                  </Text>
                  <Text style={styles.address}>
                      County:{' '}
                      {
                      details?.address?.county
                      }{' '}
                    </Text>
                  <Text style={styles.address}>
                      Country:{' '}
                      {
                     details?.address?.country
                      }{' '}
                    </Text>
                 
                </View>
               
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.moredetailsbox}
              >
                <View style={styles.itemcontainer}>
                  <MaterialCommunityIcons
                    name='calendar-check-outline'
                    color='#66C825'
                    size={25}
                  />
                  <Text style={styles.temtext1}>Start</Text>

                  <Text style={styles.temtext}>
                    {moment(
                      details?.start_date
                    ).format('MM-DD-YY, h:mm:ss a')}
                  </Text>
                </View>
                <View style={styles.itemcontainer}>
                  <MaterialCommunityIcons
                    name='calendar-check'
                    color='#66C825'
                    size={25}
                  />
                  <Text style={styles.temtext1}>End</Text>

                  <Text style={styles.temtext}>
                    {moment(
                      details?.end_date
                    ).format('MM-DD-YY, h:mm:ss a')}
                  </Text>
                </View>
                <View style={styles.itemcontainer}>
                  <MaterialIcons
                    name='workspaces-outline'
                    color='#66C825'
                    size={25}
                  />
                  <Text style={styles.temtext1}>Project Status</Text>

                  <Text style={styles.temtext}>
                    {details?.status}
                  </Text>
                </View>
                <View style={styles.itemcontainer}>
                  <MaterialCommunityIcons
                    name='format-list-bulleted-type'
                    color='#66C825'
                    size={25}
                  />
                  <Text style={styles.temtext1}>Project Type</Text>

                  <Text style={styles.temtext}>
                    {details?.type}
                  </Text>
                </View>
                {/* <View style={styles.itemcontainer}>
                  <Feather name='user-check' color='#66C825' size={25} />
                  <Text style={styles.temtext1}>Contact Name</Text>

                  <Text style={styles.temtext}>
                    {details?.contact?.full_name}{' '}
                  </Text>
                </View> */}
                <View style={styles.itemcontainer1}>
                  <Feather name='phone-call' color='#66C825' size={24} />
                  <Text style={styles.temtext1}>Contact Phone</Text>

                  <Text style={styles.temtext}>
                    {details?.tel_number}
                  </Text>
                </View>
                {/* <View style={styles.itemcontainer1}>
                  <Fontisto name='email' color='#66C825' size={24} />
                  <Text style={styles.temtext1}>Contact Email</Text>

                  <Text style={styles.temtext}>
                    {details?.contact?.primary_email_address?.address}
                  </Text>
                </View> */}
              </ScrollView>
            </View>
       
          <View style={{ height: '100%' }}>
            <View style={styles.tabs}>
            <TouchableOpacity
                onPress={handleLive}
                style={live ? styles.tab : styles.tab2}
              >
                <Text style={live ? styles.tabtext : styles.tabtext2}>
                  Live
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCalendar}
                style={calendar ? styles.tab : styles.tab2}
              >
                <Text style={calendar ? styles.tabtext : styles.tabtext2}>
                  Tasks
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={handleNote}
                style={note ? styles.tab : styles.tab2}
              >
                <Text style={note ? styles.tabtext : styles.tabtext2}>
                  Notes
                </Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={handleRams}
                style={rams ? styles.tab : styles.tab2}
              >
                <Text style={rams ? styles.tabtext : styles.tabtext2}>
                  Rams
                </Text>
              </TouchableOpacity>
          */}
             
            </View>
            {live && <Live longitude={longitude} latitude={latitude} details={details} />}
            {calendar && <Tasks tasksoff={tasksoff}  />}



            {/* <View style={styles.contentcontainer}>
              {note && <Notes id={details?.id} notes={projectDetails?.notes} />}
              {rams && <Rams id={details?.id} risks={risk} />}
            </View> */}
          </View>
        </View>
      </View>
       <ImageModal details={details} modalVisible2={modalVisible2} setModalVisible2={setModalVisible2}/> 
    </SafeAreaView>
 </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  contentcontainer: {
    marginTop: 20,
  
  

  },
  tabtext: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#66C825',
  },
  tab: {
    paddingVertical: 7,
    width: '50%',
    borderBottomColor: '#66C825',
    borderBottomWidth: 3,
    alignItems: 'center',
  },
  tabtext2: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#A9A9A9',
  },
  tab2: {
    paddingVertical: 7,
    width: '50%',
    borderBottomColor: 'rgba(220,220,220,0.4)',
    borderBottomWidth: 3,
    alignItems: 'center',
  },
  tabs: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'row',
  },

  container: {
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
    marginBottom: 20,
    paddingHorizontal: 20,
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
 
  detailspage: {
    paddingHorizontal: 20,
    
    height:"100%",
    flex:1
  },
  title: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  titleb: {
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    fontWeight: 'bold',
    color: '#000',
  },
  address: {
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(46, 58, 89, 0.7)',
    textTransform: 'capitalize',
  },
  moredetailsbox: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  itemcontainer: {
    width: 80,
    alignItems: 'center',
    marginBottom: 20,
  },
  itemcontainer1: {
    width: 80,
    alignItems: 'center',
    marginLeft: 15,
  },
  temtext: {
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(46, 58, 89, 0.6)',
    textAlign: 'center',
    marginTop: 5,
  },
  temtext1: {
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    color: '#000',
    // fontWeight:"bold",
    textAlign: 'center',
    marginTop: 5,
  },
});

