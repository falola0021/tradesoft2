import React, { useEffect, useState, useRef,useContext } from 'react';
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
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import InactiveButton from '../../components/inactive-button/Button';
import Button from '../../components/green-button/Button';

import Avatar from '../../../assets/images/avatar.png';
import { AppContext } from '../../../App';
import moment from "moment"
import AddMessage from "../message/AddMessage"
import * as Sharing from 'expo-sharing';
      import * as MediaLibrary from 'expo-media-library';
 
      


import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import AddNewHoliday from "../holiday/AddNewHoliday"
import EditHoliday from "../holiday/EditHoliday"

import * as FileSystem from 'expo-file-system';
import HolidayCalendar from "../../components/calendar/HolidayCalendar"
import Input from '../../components/inputs/Input';
import PInput from '../../components/inputs/Password';
import TextArea from '../../components/inputs/InputTextArea';
import DatePicker from "../../components/inputs/DatePicker"
import * as DocumentPicker from "expo-document-picker";



import {
  AntDesign,
  Entypo
} from '@expo/vector-icons';


const Create = () => {

  const [modalVisible ,setModalVisible] = React.useState(false);
  const [modalVisible2 ,setModalVisible2] = React.useState(false);

  const app = useContext(AppContext);
  var  myaccountinfo = app. myaccountinfo;
   var upadteProfile = app.upadteProfile;
  var changePassword =app.changePassword 

  let   deleteProfileNote=app.deleteProfileNote

var requestHoliday= app.requestHoliday
  const [message ,setMessage] = React.useState(null);
  const [loading ,setLoading] = React.useState(false);
  const [viewmessage ,setViewmessage] = React.useState(false);
  const [activeindex ,setActiveindex] = React.useState(false);
  const [success ,setSuccess] = React.useState(null);
  const [ conversationId,setConversationId] = React.useState(null);
  const [ base64image,setBase64image] = React.useState(null);
  const [ toggletab,setToggletab] = React.useState(true);
  const [ toggletab1,setToggletab1] = React.useState(false);
  const [ selectedhol,setSelectedhol] = React.useState(null);

  const [ username,setUsername] = React.useState(null);
  const [val, setVal] = React.useState(null);
  const [ fname,setFname] = React.useState(null);
  const [ lname,setLname] = React.useState(null);
  const [ dob,setDob] = React.useState(null);
  const [maxdate, setMaxdate] = React.useState(new Date(moment()));
  const [mindate, setMindate] = React.useState(new Date(moment().subtract(150, "years")));
  const [ ptel,setPtel] = React.useState(null);
  const [ wtel,setWtel] = React.useState(null);
  const [ pemail,setPemail] = React.useState(null);
  const [ wemail,setWemail] = React.useState(null);

  const [ address1,setAddress1] = React.useState(null);
  const [ address2,setAddress2] = React.useState(null);
  const [ city,setCity] = React.useState(null);
  const [ county,setCounty] = React.useState(null);
  const [ country,setCountry] = React.useState(null);
  const [ postcode,setPostcode] = React.useState(null);
  const [notes, setNotes] = React.useState(null);


  const [ oldpassword,setOldPassword] = React.useState(null);
  const [ newpassword,setNewPassword] = React.useState(null);
  const [ confirmnewpassword,setConfirmNewPassword] = React.useState(null);


  const [docname, setDocname] = React.useState(null);
  const [docsize, setDocsize] = React.useState(null);
  const [docurl, setDocurl] = React.useState(null);
  const [doctype, setDoctype] = React.useState(null);





 const handleToggletab=()=>{
   setToggletab(true)
   setToggletab1(false)
 }
 const handleToggletab1=()=>{
  setToggletab1(true)
  setToggletab(false)
}

 
   const [err ,setErr] = React.useState(null);



   const  handleChangePassword=()=>{
    let id = myaccountinfo.id
    let body={
      id:id,
      old_password:oldpassword,
      password:newpassword,
      confirm_password:confirmnewpassword
    }
    if(newpassword==confirmnewpassword){
      changePassword(
        setModalVisible,
        setMessage,
        setLoading,
        setSuccess,
        setErr,
    body
       )
       setOldPassword(null)
       setNewPassword(null)
       setConfirmNewPassword(null)
    }else{
      setErr(true);
          setSuccess(false);
          setMessage("Password mismatch");
    }
   
  
   }





const  handleDeleteProfileNote=(item)=>{
  let id = item.id
 
  deleteProfileNote(
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
 id
   )
 }

 

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


const pickDocument = async () => {

     
  let result = await DocumentPicker.getDocumentAsync();

  setDocname(result.name)
  setDocsize(result.size)
  setDocurl(result.uri)
  setDoctype(result.mimeType)
  

};


const handleUpdate=()=>{
  let id=myaccountinfo.id

 let body={
  id:id,
  first_name:fname || myaccountinfo.first_name,
  last_name: lname || myaccountinfo.last_name,
  username:username || myaccountinfo.username,
   email:wemail || myaccountinfo.email,
  address_country: country || myaccountinfo.country,
  address_county: county || myaccountinfo.county,
  address_line_1: address1 || myaccountinfo.address_line_1,
  address_line_2: address2 || myaccountinfo.address_line_2,
  address_postcode: postcode || myaccountinfo.address_postcode,
  address_town:city || myaccountinfo.address_town,
  // "attachment": "",
  birthdate:dob || myaccountinfo.birthdate,
  work_tel:wtel || myaccountinfo.work_tel,
  notes:notes ,
 personal_email: pemail || myaccountinfo.personal_email,
  personal_tel: ptel || myaccountinfo.personal_tel,
  //"profile_pic": "/uploads/1/1648726542.jpg",
}

upadteProfile( 
  setModalVisible,
  setMessage,
  setLoading,
  setSuccess,
  setErr,
  body
  )

}


const downloadAttachment = async (item) =>{ 

  var url=item.attachment
let { status } = await MediaLibrary.getPermissionsAsync();

 if (status == 'granted') {
  let path = url.split('/');
  const file_name = path[path.length-1];
   FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + file_name
  )
    .then(({ uri }) => {
      console.log('Finished downloading to ', uri);
      MediaLibrary.createAssetAsync(uri).then(asset => {
    
        console.log('asset', asset);
      MediaLibrary.createAlbumAsync('myfolder', asset)
        .then(() => {
  
          setErr(false);
          setSuccess(true);
          setMessage("Successfully downloaded");
        })
        .catch(error => {
     
          setErr(true);
          setSuccess(false);
          setMessage("Cannot download file");
        });
      });
      
    })
    .catch(error => {
      console.error(error);
    });
}else{
  let { status } = await MediaLibrary.getPermissionsAsync();
}
  




 


}



// console.log(myaccountinfo)

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <View style={{display:"flex",flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
          <Text style={styles.txt1b}>PROFILE</Text>
          <TouchableOpacity onPress={pickDocument}>
              <Image style={{height:40,width:40,borderRadius:50,marginRight:20}}
          source={{
            uri: `http://portal.trade-soft.co.uk/${myaccountinfo?.profile_pic}`,
          }}
               />
              <View style={{position:"absolute",right:17,bottom:5}}>
              <Entypo
                  name='edit'
                  color='#66C825'
                  size={15}
                />
                </View>
              </TouchableOpacity>
              </View>
              <View style={{display:"flex",flexDirection:"row",marginVertical:20}}>
           <TouchableOpacity onPress={handleToggletab} style={{backgroundColor:toggletab? "#65C825":"#DCDCDC",width:"50%",alignItems:"center"}}>
             <Text style={{color:"#fff",fontFamily: 'Nunito_600SemiBold',fontSize:12}}>Personal Information</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={handleToggletab1} style={{backgroundColor:toggletab1? "#65C825":"#DCDCDC",width:"50%",alignItems:"center"}}>

           <Text style={{color:"#fff",fontFamily: 'Nunito_600SemiBold',fontSize:12}}>Change Password</Text>

           </TouchableOpacity>

         </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
          >
             {toggletab &&
            <View style={styles.viewcontainer}>
             
           <Text style={{fontFamily: 'Nunito_800ExtraBold',fontSize:12,color:"#65C825",marginBottom:10}}>USER  DETAILS</Text>
         <View>
           <View style={{marginBottom:15}}>
         <Input
                label='username'
                placeholder='username'
                outlinecolor='grey'
                val={username?username : myaccountinfo?.username}
                setVal={setUsername}


              />
              </View>
              <View style={{marginBottom:15}}>
               <Input
                label='firstname'
                placeholder='firstname'
                outlinecolor='grey'
                val={fname?fname : myaccountinfo?.first_name}
                setVal={setFname}
              />
              </View>
              <View style={{marginBottom:15}}>
               <Input
                label='lastname'
                placeholder='lastname'
                outlinecolor='grey'
                val={lname?lname : myaccountinfo?.last_name}
                setVal={setLname}
              />
              </View>
              <View style={{marginTop:8}}>
              <DatePicker
           
           setDob={setDob}
           dob={dob?dob:"date of birth: "+ myaccountinfo?.birthdate}
          minDate={mindate}
           
            placeholder='date of birth'
           />
           </View>
          </View>
 

          <View style={{marginBottom:15}}>
         </View>
         <Text style={{fontFamily: 'Nunito_800ExtraBold',fontSize:12,color:"#65C825",marginBottom:10,marginTop:20}}>CONTACT DETAILS</Text>
         <View>
         <View style={{marginBottom:15}}>
         <Input
                label='work telephone'
                placeholder='work telephone'
                outlinecolor='grey'
                val={wtel?wtel : myaccountinfo?.work_tel}
                setVal={setWtel}
              />
              </View>
              <View style={{marginBottom:15}}>
              <Input
                label='personal telephone'
                placeholder='personal telephone'
                outlinecolor='grey'
                val={ptel?ptel : myaccountinfo?.personal_tel}
                setVal={setPtel}
              />
              </View>
              <View style={{marginBottom:15}}>
              <Input
                label='work email'
                placeholder='work email'
                outlinecolor='grey'
                val={wemail?wemail : myaccountinfo?.email}
                setVal={setWemail}
              />
              </View>
              <View style={{marginBottom:15}}>
               <Input
                label='personal email'
                placeholder='personal email'
                outlinecolor='grey'
                val={pemail?pemail : myaccountinfo?.personal_email}
                setVal={setPemail}
              />
              </View>
              
         </View>
         <Text style={{fontFamily: 'Nunito_800ExtraBold',fontSize:12,color:"#65C825",marginBottom:10,marginTop:20}}>YOUR ADDRESS</Text>
         <View>
         <View style={{marginBottom:15}}>
         <Input
                label='address line 1'
                placeholder='address line 1'
                outlinecolor='grey'
                val={address1?address1 : myaccountinfo?.address_line_1}
                setVal={setAddress1}
              />
              </View>
              <View style={{marginBottom:15}}>
              <Input
                label='address line 2'
                placeholder='address line 2'
                outlinecolor='grey'
                val={address2?address2: myaccountinfo?.address_line_2}
                setVal={setAddress2}
              />
              </View>
              <View style={{marginBottom:15}}>
              <Input
                label='town/city'
                placeholder='town/city'
                outlinecolor='grey'
                val={city?city : myaccountinfo?.address_town}
                setVal={setCity}
              />
              </View>
              <View style={{marginBottom:15}}>
               <Input
                label='county/state'x
                placeholder='county/state'
                outlinecolor='grey'
                val={county?county : myaccountinfo?.address_county}
                setVal={setCounty}
              />
              </View>
              <View style={{marginBottom:15}}>
              <Input
                label='postcode/zip code'
                placeholder='username'
                outlinecolor='grey'
                val={postcode?postcoe : myaccountinfo?.address_postcode}
                setVal={setPostcode}
              />
              </View>
              <View style={{marginBottom:15}}>
               <Input
                label='country'
                placeholder='country'
                outlinecolor='grey'
                val={country?country : myaccountinfo?.address_country}
                setVal={setCountry}
              />
              </View>
              
         </View>

         <Text style={{fontFamily: 'Nunito_800ExtraBold',fontSize:12,color:"#65C825",marginBottom:10,marginTop:20}}>ADDITIONAL INFO</Text>
         <View>
         <View style={{marginBottom:15}}>
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
                 </View>
             <TextArea
                  placeholder='Notes'
                  label='Notes'
                  val={notes}
                  setVal={setNotes}
                />
           
           {myaccountinfo?.user_notes?.map((item) => 

                <View style={{backgroundColor:"rgba(226,226,226,0.7)",marginVertical:10,padding:10}}>
                <Text style={{fontSize:10}}> {item.created_at}</Text>
                  <Text> {item.notes}</Text>
                  <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginVertical:20}}>
                    {item.attachment !=="" ?
                  <TouchableOpacity onPress={()=> downloadAttachment(item)}>
                    <Text style={{color:'#65C825'}}>Download</Text>
                  </TouchableOpacity> :
                
                    
                       <Text style={{color:'grey'}}>No Attatchement</Text>
                

                  }
                  <TouchableOpacity onPress={()=>handleDeleteProfileNote(item)}>
                    <Text style={{color:'red'}}>Delete</Text>
                  </TouchableOpacity>
                  </View>
                </View>
                )
           }   
              
         </View>
         <View style={{marginVertical:20}}> 
         <Button
              
                  handleNavigate={handleUpdate}
                  text='Save Changes'
                />
                </View>
         {/* <TouchableOpacity onPress={handleUpdate} style={{paddingVertical:16,backgroundColor:"#65C825",marginVertical:20,alignItems:"center",borderRadius:5,marginBottom:40}}>
           <Text style={{color:"#fff",fontFamily: 'Nunito_800ExtraBold',fontSize:14}}>Save Changes</Text>
         </TouchableOpacity> */}



            </View>
}
     {toggletab1 &&
      <View style={styles.viewcontainer}>
      <Text style={{fontFamily: 'Nunito_800ExtraBold',fontSize:12,color:"#65C825",marginBottom:10}}>CHANGE PASSWORD</Text>
         <View>
         <View style={{marginBottom:15}}>
         <PInput
                label='old password'
                placeholder='old password'
                outlinecolor='grey'
                password={oldpassword}
                setPassword={setOldPassword}
              />
              </View>
              <View style={{marginBottom:15}}>
               <PInput
               label='new password'
               placeholder='New Password(8 characters minimum)'
               outlinecolor='grey'
               password={newpassword}
               setPassword={setNewPassword}
              />
              </View>
              <View style={{marginBottom:15}}>
               <PInput
               label='confirm new password'
               placeholder='confirm new password'
               outlinecolor='grey'
               password={confirmnewpassword}
               setPassword={setConfirmNewPassword}
              />
              </View>
              {oldpassword && confirmnewpassword  && newpassword ? (
                <Button
                  //loading={loading}
                  handleNavigate={handleChangePassword}
                  text='Change Password'
                />
              ) : (
                <InactiveButton text='Change Password' />
              )}
           
         </View>
</View>
}
          </ScrollView>
         
        </View>
      </View>
      {/* <EditHoliday selectedhol={selectedhol} users={users} modalVisible={modalVisible} setModalVisible= {setModalVisible} handleUpdateHoliday={handleUpdateHoliday}/>
        <AddNewHoliday  users={users} modalVisible={modalVisible2} setModalVisible= {setModalVisible2} handleNewHoliday={handleNewHoliday}/> */}

    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
 
  container: {
    paddingTop: 20,

    height: '100%',
  },
 
 
  
  txt1b: {
    color: '#2E3A59',

    fontSize: 16,
    fontFamily: 'Nunito_800ExtraBold',
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  viewcontainer:{
  paddingHorizontal:20
   
  },
  buttoncontainer:{
alignItems:"flex-end",
marginTop:15,
paddingHorizontal:20,
marginBottom:10

  },
  buttonbox:{
    backgroundColor:'#65C825',
    paddingHorizontal:30,
    paddingVertical:8,
    borderRadius:7
  },
  buttontext:{
    color:"#fff",
    fontFamily: 'Nunito_600SemiBold',
  },
  avatar:{
    height:20,
    width:20,
    borderRadius:50,
    marginRight:5
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
  },
  attachmentbox:{
    display:"flex",
    flexDirection:"row",
    borderColor:"rgba(46, 58, 89, 0.2)",
    borderWidth:1,
    // marginTop:30,
    paddingVertical:18,
    alignItems:"center",
    // justifyContent:"center",
    borderRadius:5,
    paddingHorizontal:20
  },

  bottomtxt2: {
    color: 'rgba(46, 58, 89, 0.7)',
    fontSize: 8,
    fontFamily: 'Nunito_600SemiBold',
    textTransform:"lowercase",
    // marginTop:30,
    marginBottom:5
  },
});

