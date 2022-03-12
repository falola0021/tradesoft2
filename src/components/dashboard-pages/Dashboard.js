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
import MoreDetails from '../dashboard-moreinfo/MoreInfo';
import { showMessage, hideMessage } from 'react-native-flash-message';
import moment from 'moment';

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
  const [message, setMessage] = React.useState(null);
  const [details, setDetails] = React.useState(null);


  const handleNavigateToDetails = (item) => {
    setModalVisible(true);
   setDetails(item)
  };

  const app = useContext(AppContext);
  var getAllLiveProjects = app.getAllLiveProjects;
  var getAllProjects = app.getAllProjects;
  var allProjects = app.allProjects;
  var allLiveProjects = app.allLiveProjects;

  const latestClockinsTime = app.latestClockinsTime;


  const err = app.err;
 

  useEffect(() => {
    getAllLiveProjects(setModalVisible, setMessage, setLoading);
    getAllProjects(setModalVisible, setMessage, setLoading);

  }, []);

  if (err && message) {
    showMessage({
      message: 'ERROR',
      description: message,
      type: 'danger',
    });
    setMessage(false);
  }


  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <Text style={styles.txt1b}>LIVE PROJECTS</Text>
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
                      onPress={()=>handleNavigateToDetails(item)}
                      style={styles.secbox}
                    >
                      <ImageBackground
                        imageStyle={{
                          borderTopLeftRadius: 6,
                          borderTopRightRadius: 6,
                        }}
                        source={{
                          uri: `http://portal.trade-soft.co.uk/${item?.image_src}`,
                        }}
                        style={styles.imgbg}
                      >
                        <FontAwesome
                          name='tag'
                          color={item?.is_callout == '1' ? '#01B0E9' : '#66C825'}
                          size={18}
                        />
                      </ImageBackground>
                      <View style={styles.bottomtxtbox}>
                        <Text style={styles.bottomtxt}>{item?.name}</Text>
                      </View>

                      <View style={styles.bottomtxtbox2}>
                        <Text style={styles.bottomtxt2}>
                          {/* {item?.address.address_line_1} */}
                        </Text>
                      </View>
                      <View style={styles.bottomtxtbox2}>
                        <Text style={styles.bottomtxt2}>Task: </Text>
                        <Text style={styles.bottomtxt3}>No task from API</Text>
                      </View>
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
                      <View style={styles.bottomtxtbox2}>
                        <Text style={styles.bottomtxt2}>Project Status: </Text>
                        <Text style={styles.bottomtxt4}>{item?.status}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </ScrollView>
          )}

{
  !loading &&
  
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
                    <Fontisto name='checkbox-active' color='yellow' size={12} />
                    <View>
                      <Text style={styles.bb}>{item.project_name}</Text>
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

}
        </View>
      </View>
      <MoreDetails
      details={details}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
    height: 280,
    borderRadius: 10,
    marginBottom: 20,
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
  bottomtxtbox2: {
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',

    marginBottom: 5,
  },
  bottomtxt2: {
    color: 'rgba(46, 58, 89, 0.7)',
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
  },
  bottomtxt3: {
    color: '#2E3A59',
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
  },
  bottomtxt4: {
    color: '#348045',
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
  },
  scroll: {
    paddingTop: 20,

    maxHeight: 800,
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
