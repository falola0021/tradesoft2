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
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import OfflineDetails from '../dashboard-moreinfo/MoreInfo';
import { showMessage, hideMessage } from 'react-native-flash-message';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
  Octicons,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';
import Avatar from '../../../assets/images/avatar.png';

import { ScrollView } from 'react-native-gesture-handler';
import { AppContext } from '../../../App';

const Create = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [offlinemodalVisible, setOfflineModalVisible] = React.useState(false);

  const [message, setMessage] = React.useState(null);
  const [details, setDetails] = React.useState(null);
  const [showclock, setShowclock] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [offlinestatus, setOfflinestatus] = React.useState(false);

  const handleNavigateToDetails = (item) => {
    setShowclock(false);
    let details = item;
    navigation.navigate('ProjectDetails', { details });
    //   setModalVisible(true);
    //  setDetails(item)
  };

  const app = useContext(AppContext);
  var getAllLiveProjects = app.getAllLiveProjects;
  var getAllProjects = app.getAllProjects;
  var allProjects = app.allProjects;
  var allLiveProjects = app.allLiveProjects;
  var getAllTask = app.getAllTask;
  const clockInOutOffline = app.clockInOutOffline;

  var markAsRead = app.markAsRead;
  const latestClockinsTime = app.latestClockinsTime;

  const err = app.err;
  const setErr = app.setErr;

  const getOffliveliveprojects = async () => {
    const offlineliveprojects = await AsyncStorage.getItem(
      'offlineliveprojects'
    );

    if (offlineliveprojects !== null) {
      // We have data!!
      const parsedofflineliveprojects = JSON.parse(offlineliveprojects);
    }
  };

  const getOfflineclockinsStatus = async () => {
    const offlineclockins = await AsyncStorage.getItem('offlineclockinsinfo');

    if (offlineclockins !== null) {
      const parsedofflineclockins = JSON.parse(offlineclockins);
      setOfflinestatus(parsedofflineclockins);
      if (parsedofflineclockins.length > 0) {
        setOfflineModalVisible(true);
      }
    }
  };
  const submitOfflineData = () => {
    offlinestatus?.map((item) =>
      clockInOutOffline(
        setModalVisible,
        setMessage,
        setLoading,
        setSuccess,
        setErr,
        item.projectId,
        item.lat,
        item.lng
      )
    );
    setOfflineModalVisible(false);
  };

  useEffect(() => {
    getOffliveliveprojects();
    getAllLiveProjects(setModalVisible, setMessage, setLoading);
    getAllProjects(setModalVisible, setMessage, setLoading);
    getAllTask(setModalVisible, setMessage, setLoading);
    getOfflineclockinsStatus();
  }, []);

  if (err && message) {
    showMessage({
      message: 'ERROR',
      description: message,
      type: 'danger',
    });
    setMessage(false);
  }

  const handleShowClockins = () => {
    setShowclock(!showclock);
  };

  const handleMarkAsRead = (item) => {
    let id = item.id;
    markAsRead(setModalVisible, setMessage, setLoading, setSuccess, setErr, id);
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.txt1b}>LIVE PROJECTS</Text>
            <TouchableOpacity
              onPress={handleShowClockins}
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginRight: 20,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#66C825', fontSize: 14, marginRight: 5 }}>
                View Clock-ins
              </Text>

              <MaterialCommunityIcons
                name='clock-outline'
                color='green'
                size={17}
              />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size='25%' color='#c3c3c3' />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}
            >
              <View style={styles.viewcontainer}>
                <FlatList
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                  legacyImplementation={false}
                  data={allLiveProjects}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => handleNavigateToDetails(item)}
                      style={styles.secbox}
                    >
                      <ImageBackground
                        imageStyle={{
                          borderTopLeftRadius: 6,
                          borderTopRightRadius: 6,
                        }}
                        source={{
                          uri: `https://portal.trade-soft.co.uk/${item?.image_src}`,
                        }}
                        style={styles.imgbg}
                      >
                        <FontAwesome
                          name='tag'
                          color={
                            item?.is_callout == '1' ? '#01B0E9' : '#66C825'
                          }
                          size={18}
                        />
                      </ImageBackground>
                      <View style={styles.bottomtxtbox}>
                        <Text style={styles.bottomtxt}>{item?.name}</Text>
                      </View>

                      {/* <View style={styles.bottomtxtbox2}>
                        <Text style={styles.bottomtxt2}>
                    
                        </Text>
                      </View> */}
                      {/* <View style={styles.bottomtxtbox2}>
                        <Text style={styles.bottomtxt2}>Task: </Text>
                        <Text style={styles.bottomtxt3}>No task from API </Text>
                      </View> */}

                      <View style={styles.bottomtxtbox2}>
                        <Text style={styles.bottomtxt2}>Start: </Text>
                        <Text style={styles.bottomtxt3}>
                          {moment(item?.start_date).format(
                            'MM-DD-YY, h:mm:ss a'
                          )}
                        </Text>
                      </View>
                      <View style={styles.bottomtxtbox2}>
                        <Text style={styles.bottomtxt2}>End: </Text>
                        <Text style={styles.bottomtxt3}>
                          {moment(item?.end_date).format('MM-DD-YY, h:mm:ss a')}
                        </Text>
                      </View>
                      <View style={styles.bottomtxtbox2a}>
                        <Text style={styles.bottomtxt2}>Address : </Text>
                        <Text style={styles.bottomtxt3}>
                          {item?.address?.address_line_1}
                        </Text>
                        <Text style={styles.bottomtxt3}>
                          {item?.address?.address_line_2}
                        </Text>
                        <Text style={styles.bottomtxt3}>
                          {item?.address?.county}
                        </Text>
                        <Text style={styles.bottomtxt3}>
                          {item?.address?.postcode}
                        </Text>
                        <Text style={styles.bottomtxt3}>
                          {item?.address?.country}
                        </Text>
                      </View>
                      <View style={styles.bottomtxtbox2}>
                        <Text style={styles.bottomtxt2}>Project Status: </Text>
                        <Text style={styles.bottomtxt4}>{item?.status}</Text>
                      </View>
                      <View style={styles.bottomtxtbuttonbox}>
                        {/* <TouchableOpacity onPress={handleNavigateToDetails} style={styles.btn1}>
               <Text style={styles.btntext2}>GO TO PROJECT</Text>
               </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() =>
                            item.status !== 'finalised' &&
                            handleMarkAsRead(item)
                          }
                          style={
                            item.status == 'finalised'
                              ? styles.btn1
                              : styles.btn2
                          }
                        >
                          <Text
                            style={
                              item.status == 'finalised'
                                ? styles.btntext2a
                                : styles.btntext2
                            }
                          >
                            {item?.status == 'finalised'
                              ? 'COMPLETED'
                              : 'MARK AS COMPLETE'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </ScrollView>
          )}

          {!loading && (
            <>
              {showclock && (
                <>
                  <Text style={styles.txt1b}>LATEST CLOCK-INS</Text>

                  {latestClockinsTime?.length > 0 ? (
                    <ScrollView
                      style={{
                        backgroundColor: 'rgb(102,200,37)',
                        paddingHorizontal: 20,
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                      showsVerticalScrollIndicator={false}
                    >
                      {latestClockinsTime?.map((item) => (
                        <View key={item.id} style={styles.clockbox}>
                          <View style={styles.aa}>
                            <Fontisto
                              name='checkbox-active'
                              color='yellow'
                              size={12}
                            />
                            <View>
                              <Text numberOfLines={1} style={styles.bb}>
                                {item.project_name}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.aa}>
                            <MaterialCommunityIcons
                              name='clock-outline'
                              color='green'
                              size={14}
                            />
                            <Text style={styles.bb}>{item.clock_in_time}</Text>
                          </View>
                          <View style={styles.aa}>
                            <MaterialCommunityIcons
                              name='clock-outline'
                              color='red'
                              size={14}
                            />
                            <Text style={styles.bb}>{item.clock_out_time}</Text>
                          </View>
                        </View>
                      ))}
                    </ScrollView>
                  ) : (
                    <Text>No Available clockin</Text>
                  )}
                </>
              )}
            </>
          )}
        </View>
      </View>
      <OfflineDetails
        details={details}
        modalVisible={offlinemodalVisible}
        setModalVisible={setOfflineModalVisible}
        submitOfflineData={submitOfflineData}
      />
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  bb: {
    fontSize: 12,
    marginLeft: 7,
    fontFamily: 'Nunito_400Regular',
    alignItems: 'center',
    color: '#fff',
    width: 100,
  },
  aa: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // color:"#fff"
  },
  clockbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderBottomColor: '#fff',
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 5,
  },
  container: {
    paddingTop: 20,

    height: '100%',
  },
  title: {
    color: '#0130B0',
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'GilroyBold',
  },
  subtitle: {
    color: '#2E3A59',
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    marginBottom: 20,
  },

  headsec: {
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sec1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  txt1: {
    color: '#2E3A59',

    fontSize: 16,
    fontFamily: 'Nunito_800ExtraBold',
  },
  txt1b: {
    color: '#2E3A59',

    fontSize: 16,
    fontFamily: 'Nunito_800ExtraBold',
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  txt2: {
    color: '#2E3A59',
    // marginBottom: 80,
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    fontWeight: '500',
  },

  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  secbox: {
    backgroundColor: '#fff',
    width: '48%',
    height: 365,
    borderRadius: 10,
    marginBottom: 30,
  },
  viewcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  imgbg: {
    height: 110,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  riskbox: {
    position: 'absolute',
    bottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  risk: {
    color: '#fff',
    backgroundColor: '#1B64E5',
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontSize: 10,
    borderRadius: 20,
    fontFamily: 'Nunito_600SemiBold',
  },
  bottomtxtbox: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  bottomtxt: {
    color: '#2E3A59',
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
  },
  bottomtxtbox2a: {
    paddingHorizontal: 10,
    // display: 'flex',
    // flexDirection: 'row',
    width: '100%',

    marginBottom: 5,
  },
  bottomtxtbox2: {
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',

    marginBottom: 5,
  },
  bottomtxt2: {
    color: 'rgba(46, 58, 89, 0.7)',
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
  },
  bottomtxt3: {
    color: '#2E3A59',
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
  },
  bottomtxt4: {
    color: '#348045',
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
  },
  scroll: {
    paddingTop: 20,

    maxHeight: 800,
  },

  bottomtxtbuttonbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    // paddingHorizontal:10,
    position: 'absolute',
    bottom: 0,
  },
  btn1: {
    backgroundColor: '#F1E22E',
    width: '100%',
    height: 37,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#66C825',
    // // width:140,
    // height:37,
    // // borderRadius:7,
    // alignItems:"center",
    // justifyContent:"center"
  },
  btn2: {
    backgroundColor: '#66C825',
    width: '100%',
    height: 37,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntext2: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 2,
  },
  btntext2a: {
    color: '#000',
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 2,
  },
});

{
  /* <TouchableOpacity onPress={handleNavigateToDetails} style={styles.secbox}>
<ImageBackground
  imageStyle={{
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  }}
  source={require('../../../assets/images/avatar.png')}
  style={styles.imgbg}
></ImageBackground>
<View style={styles.bottomtxtbox}>
  <Text style={styles.bottomtxt}>JIIOJIOI</Text>
</View>

<View style={styles.bottomtxtbox2}>
  <Text style={styles.bottomtxt2}>Account: </Text>
  <Text style={styles.bottomtxt3}>₦30,952.61</Text>
</View>
<View style={styles.bottomtxtbox2}>
  <Text style={styles.bottomtxt2}>Status: </Text>
  <Text style={styles.bottomtxt3}>Scheduling</Text>
</View>
<View style={styles.bottomtxtbox2}>
  <Text style={styles.bottomtxt2}>Start: </Text>
  <Text style={styles.bottomtxt3}>20-10-2022 10:18am</Text>
</View>
<View style={styles.bottomtxtbox2}>
  <Text style={styles.bottomtxt2}>End: </Text>
  <Text style={styles.bottomtxt3}>20-10-2022 10:18pm</Text>
</View>
<View style={styles.bottomtxtbox2}>
  <Text style={styles.bottomtxt2}>Post: </Text>
  <Text style={styles.bottomtxt3}>hsshshhs</Text>
</View>
<View style={styles.bottomtxtbox2}>
  <Text style={styles.bottomtxt2}>Estimate: </Text>
  <Text style={styles.bottomtxt3}>abababa</Text>
</View>
<View style={styles.bottomtxtbox2}>
  <Text style={styles.bottomtxt2}>Postal: </Text>
  <Text style={styles.bottomtxt3}>jm,kkkk</Text>
</View>

</TouchableOpacity> */
}
