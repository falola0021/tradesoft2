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

import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
  Octicons,
  Entypo,
} from '@expo/vector-icons';
import Avatar from '../../../assets/images/avatar.png';
import { AppContext } from '../../../App';
import moment from "moment"
import AddMessage from "../message/AddMessage"
import * as Sharing from 'expo-sharing';
      import * as MediaLibrary from 'expo-media-library';
      import * as Permissions from "expo-permissions";


import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import AddNewHoliday from "../holiday/AddNewHoliday"
import * as FileSystem from 'expo-file-system';
import HolidayCalendar from "../../components/calendar/HolidayCalendar"

const Create = () => {
  const navigation = useNavigation();
  const [modalVisible ,setModalVisible] = React.useState(false);
  const [modalVisible2 ,setModalVisible2] = React.useState(false);

  const app = useContext(AppContext);
  var getAllHolidays = app.getAllHolidays;
var allholidays = app.allholidays;
 let getUsers = app.getUsers
   let  users = app.users
 let  getMessageDetails=app.getMessageDetails
  let deleteMessage=app.deleteMessage
 var replyMessage=app.replyMessage
var addMessage = app.addMessage
  const [message ,setMessage] = React.useState(null);
  const [loading ,setLoading] = React.useState(false);
  const [viewmessage ,setViewmessage] = React.useState(false);
  const [activeindex ,setActiveindex] = React.useState(false);
  const [success ,setSuccess] = React.useState(null);
  const [ conversationId,setConversationId] = React.useState(null);
  const [ base64image,setBase64image] = React.useState(null);
  const [ toggletab,setToggletab] = React.useState(true);
  const [ toggletab1,setToggletab1] = React.useState(false);


 const handleToggletab=()=>{
   setToggletab(true)
   setToggletab1(false)
 }
 const handleToggletab1=()=>{
  setToggletab1(true)
  setToggletab(false)
}

 
   const [err ,setErr] = React.useState(null);


  

const handleshowmessage=(index,item)=>{
  setActiveindex(index)
  let  message_id=item.id
  getMessageDetails( setModalVisible,
    setMessage,
    setLoading,
    message_id)
}
 const handleclosemessage=()=>{

   setActiveindex(null)
   setLoading(null)
 }
  

useEffect(() => {
 getAllHolidays(setModalVisible,setMessage,setLoading)
  getUsers(setModalVisible,setMessage,setLoading)

}, [])


const handleAddNewMessage = (item) => {
  setConversationId(item.id)
 
  setViewmessage(false)
setModalVisible2(!modalVisible2)
 
};

  const handleAddMessage = (item) => {
   setConversationId(item.id)
    setViewmessage(false)
setModalVisible(!modalVisible)
   
  };

 const handleDeleteMessage=(item,messagedetail)=>{
  let  message_id=item.id
  let  conversation_id = messagedetail.id
 deleteMessage(
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
    message_id,
    conversation_id
   )
 }






const handleNewMessage = async(val,title,docname,docsize,docurl,doctype,selectedItems)=>{
  let content = val

 if(docname){
const base64 = await FileSystem.readAsStringAsync(docurl, {
   encoding: 'base64',
 });
 setBase64image(`data:image/png;base64,${base64}`)
}


var taggedUser=selectedItems.toString()
let body = {
  user_id: taggedUser,
  subject:title,
 conversation_id : conversationId,
 content:content,
 name: "attachment",
 filename: docname,
 type: "pdf",
 data:base64image
}

addMessage(
   setModalVisible,
   setMessage,
   setLoading,
   setSuccess,
   setErr,
 body
  )
}




 const handleReplyMessage= async(val,docname,docsize,docurl,doctype)=>{
   let content = val

   if(docname){
    const base64 = await FileSystem.readAsStringAsync(docurl, {
      encoding: 'base64',
    });
    setBase64image(`data:image/png;base64,${base64}`)
   }

  


let body = {
  conversation_id : conversationId,
  content:content,
  name: "attachment",
  filename: docname,
  type: "pdf",
data:base64image
}

 replyMessage(
    setModalVisible,
    setMessage,
    setLoading,
    setSuccess,
    setErr,
  body
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



console.log(allholidays)
  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <Text style={styles.txt1b}>HOLIDAYS</Text>
 

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
          >
            <View style={styles.viewcontainer}>
             <View style={styles.buttoncontainer}> 
               <TouchableOpacity onPress={handleAddNewMessage} style={styles.buttonbox}>
                 <Text style={styles.buttontext}>Request Holiday</Text>
               </TouchableOpacity>
             </View>
             <View style={{display:"flex",flexDirection:"row",marginVertical:20}}>
           <TouchableOpacity onPress={handleToggletab} style={{backgroundColor:toggletab? "#65C825":"#DCDCDC",width:"50%",alignItems:"center"}}>
             <Text style={{color:"#fff",fontFamily: 'Nunito_600SemiBold',fontSize:12}}>Holiday Requests</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={handleToggletab1} style={{backgroundColor:toggletab1? "#65C825":"#DCDCDC",width:"50%",alignItems:"center"}}>

           <Text style={{color:"#fff",fontFamily: 'Nunito_600SemiBold',fontSize:12}}>View On Calendar</Text>

           </TouchableOpacity>

         </View>
          {toggletab &&
             <FlatList
        data={allholidays}
       
        keyExtractor={(item) => item.id}
        renderItem={({ item ,index}) => (
          <View style={{marginTop:10,backgroundColor:"#fff",  paddingHorizontal:20,paddingBottom:15,
          paddingTop:10}}>
         <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
           <View style={{display:"flex",flexDirection:"row",alignItems:'center'}}>
           
           
           </View>
         
         </View>
         <View style={{marginTop:10}}>
         
         <Text style={{color:"#000",fontFamily:'Nunito_600SemiBold',fontSize:12}}>
           <Text style={{color:"#65C825",fontFamily:'Nunito_600SemiBold',fontSize:12}}>Reason : </Text>{item.holiday_reason}</Text>
         </View>
         <View style={{marginTop:10}}>
         
         <Text style={{color:"#000",fontFamily:'Nunito_600SemiBold',fontSize:12}}> 
           <Text style={{color:"#65C825",fontFamily:'Nunito_600SemiBold',fontSize:12}}>Start Date : </Text>{moment(item?.start_date).format(
                            'MM-DD-YY, h:mm:ss a'
                          )}</Text>
         </View>
         <View style={{marginTop:10}}>
         
         <Text style={{color:"#000",fontFamily:'Nunito_600SemiBold',fontSize:12}}>  
          <Text style={{color:"#65C825",fontFamily:'Nunito_600SemiBold',fontSize:12}}>End Date : </Text>{moment(item?.end_date).format(
                            'MM-DD-YY, h:mm:ss a'
                          )}</Text>
         </View>
        
         <View style={{marginTop:10}}>
         
         <Text style={{color:"#000",fontFamily:'Nunito_600SemiBold',fontSize:12}}>
           <Text style={{color:"#65C825",fontFamily:'Nunito_600SemiBold',fontSize:12}}>Total Days : </Text>{item.total_days} (days)</Text>
         </View>
         <View style={{marginTop:10}}>
         
         <Text style={{color:item.leave_status_info=="Pending"?"orange":item.leave_status_info=="Approved" ? "#65C825": "red",fontFamily:'Nunito_600SemiBold',fontSize:12}}>
           <Text style={{color:"#65C825",fontFamily:'Nunito_600SemiBold',fontSize:12}}>Status : </Text>{item.leave_status_info}</Text>
         </View>

         <View style={{marginTop:15,display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
          
             <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
             <TouchableOpacity onPress={()=> activeindex !==index ? handleshowmessage(index,item):handleclosemessage()} >
             <Text style={{fontFamily:"Nunito_600SemiBold",fontSize:12,color:"grey"}}>Edit Message</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>handleAddMessage(item)} >
             <Text style={{fontFamily:"Nunito_600SemiBold",fontSize:12,color:"red",marginLeft:20}}>Delete </Text>
              </TouchableOpacity>
             </View>
           
          
         </View>
         
       </View>
        )}
      />
           }

           {toggletab1 &&
             <View>
               <HolidayCalendar/>
             </View>
           }
         
         
              
             
            </View>
          </ScrollView>
         
        </View>
      </View>
  <AddMessage  modalVisible={modalVisible} setModalVisible= {setModalVisible} handleReplyMessage={handleReplyMessage} />
  <AddNewHoliday users={users} modalVisible={modalVisible2} setModalVisible= {setModalVisible2}  handleAddNewMessage={handleNewMessage}/>

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
  }

});

