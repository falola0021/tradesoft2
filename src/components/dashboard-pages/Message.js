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

import Avatar from '../../../assets/images/avatar.png';
import { AppContext } from '../../../App';
import moment from "moment"
import AddMessage from "../message/AddMessage"
import * as Sharing from 'expo-sharing';
      import * as MediaLibrary from 'expo-media-library';
      import * as Permissions from "expo-permissions";


import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import AddNewMessage from "../message/AddNewMessage"
import * as FileSystem from 'expo-file-system';


const Create = () => {
  const navigation = useNavigation();
  const [modalVisible ,setModalVisible] = React.useState(false);
  const [modalVisible2 ,setModalVisible2] = React.useState(false);

  const app = useContext(AppContext);
  var  getAllMessage = app.getAllMessage;
  var allmessage = app.allmessage;
 let  messagedetails=app.messagedetails
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
  getAllMessage(setModalVisible,setMessage,setLoading)
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


const downloadAttachment = async (messagedetail) =>{ 
  var attachment=messagedetail.attachment
  var url=`https://dev.trade-soft.co.uk${attachment}`
console.log(url)

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
}



//  const downloadAttachment=()=>[
//   FileSystem.downloadAsync(
//     'https://i.ibb.co/K5Tyv2C/img-5-1.png',
//     FileSystem.documentDirectory + 'small.mp4'
//   )
//     .then(({ uri }) => {
//       console.log('Finished downloading to ', uri);
//     })
//     .catch(error => {
//       console.error(error);
//     }),
//  ]




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




  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <Text style={styles.txt1b}>MESSAGES</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}
          >
            <View style={styles.viewcontainer}>
             <View style={styles.buttoncontainer}> 
               <TouchableOpacity onPress={handleAddNewMessage} style={styles.buttonbox}>
                 <Text style={styles.buttontext}>New Chat</Text>
               </TouchableOpacity>
             </View>

             <FlatList
        data={allmessage}
       
        keyExtractor={(item) => item.id}
        renderItem={({ item ,index}) => (
          <View style={{marginTop:10,backgroundColor:"#fff",  paddingHorizontal:20,paddingBottom:15,
          paddingTop:10}}>
         <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
           <View style={{display:"flex",flexDirection:"row",alignItems:'center'}}>
           
             <View  >
               {/* <View style={{display:"flex",flexDirection:"row",alignItems:'center',marginBottom:4}}>
               <Image style={styles.avatar}  source={Avatar}/>
               <Text  style={{ fontFamily: 'Nunito_600SemiBold',fontSize:10,color:"grey"}}>Abbeb Moral</Text>

               </View> */}
               <View style={{display:"flex",flexDirection:"row",alignItems:'center',marginBottom:10}}>
               <Image style={styles.avatar}  source={Avatar}/>
               <Text  style={{ fontFamily: 'Nunito_600SemiBold',fontSize:10,color:"grey"}}>Abbeb Moral</Text>

               </View>
             </View>
           </View>
           <View>
           <Text style={{color:"grey",fontFamily:'Nunito_600SemiBold',fontSize:10,}}>{moment(item?.created_at).format(
                            'MM-DD-YY, h:mm:ss a'
                          )}</Text>
          
           </View>
         </View>
         {/* {activeindex !=index && !loading  && */}
         <View>
         <Text style={{color:"#65C825",fontFamily:'Nunito_600SemiBold',fontSize:12}}>{item.subject}</Text>
         </View>
        {/* } */}
    

         {activeindex==index && !loading  &&
          <>
           {messagedetails?.map((messagedetail) =>
  
 
        <View>
          <View>
          <View style={{display:"flex",flexDirection:"row",alignItems:'center',marginBottom:4,marginTop:10,width:"100%",paddingRight:20}}>
               <Image style={styles.avatar}  source={Avatar}/>
               <View >
               <Text  style={{ fontFamily: 'Nunito_600SemiBold',fontSize:10,color:"grey"}}>{messagedetail.full_name}</Text>
              
               </View>

               </View>

          </View>
          <Text style={{color:"#000",fontFamily:'Nunito_600SemiBold',fontSize:10}}> {messagedetail.content} </Text>
          <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"100%",marginTop:10,marginBottom:5}}>
                       <Text  style={{ fontFamily: 'Nunito_600SemiBold',fontSize:10,color:"grey"}}>{moment(messagedetail?.created_at).format(
                            'MM-DD-YY, h:mm:ss a'
                          )}</Text> 
                                 <View style={{display:"flex",flexDirection:"row"}}>
           {messagedetail?.attachment !="0" ?

              <TouchableOpacity onPress={()=>downloadAttachment(messagedetail)}  >
               <Text style={{color:"#65C825",fontFamily:'Nunito_600SemiBold',fontSize:10}}>View Attatch</Text>
               </TouchableOpacity>:
                              <Text style={{color:"grey",fontFamily:'Nunito_600SemiBold',fontSize:10}}>No ttatch</Text>
                           

        }
               <TouchableOpacity onPress={()=>handleDeleteMessage(item,messagedetail)}>
             <Text style={{fontFamily:"Nunito_600SemiBold",fontSize:10,color:"red",marginLeft:30}}>Delete</Text>
           </TouchableOpacity> 
           </View>
           </View>

        </View>
         )}
        </>
 } 
         <View style={{marginTop:15,display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
          
             <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
             <TouchableOpacity onPress={()=> activeindex !==index ? handleshowmessage(index,item):handleclosemessage()} >
             <Text style={{fontFamily:"Nunito_600SemiBold",fontSize:12,color:"grey"}}>{activeindex !==index? "View Messages" : "Close Messages"}</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>handleAddMessage(item)} >
             <Text style={{fontFamily:"Nunito_600SemiBold",fontSize:12,color:"#65C825",marginLeft:20}}>Reply </Text>
              </TouchableOpacity>
             </View>
           
          
         </View>
         
       </View>
        )}
      />
         
         
              
             
            </View>
          </ScrollView>
         
        </View>
      </View>
  <AddMessage  modalVisible={modalVisible} setModalVisible= {setModalVisible} handleReplyMessage={handleReplyMessage} />
  <AddNewMessage users={users} modalVisible={modalVisible2} setModalVisible= {setModalVisible2}  handleAddNewMessage={handleNewMessage}/>

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

