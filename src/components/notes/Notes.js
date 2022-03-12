import { View, Text, TouchableOpacity, StyleSheet, Image,Modal } from 'react-native';
import React, { useEffect, useState, useRef, useContext } from 'react';
import Pic from '../../../assets/images/avatar.png';
import AddNote from "./AddNote"
import moment from 'moment';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { AppContext } from '../../../App';
import { showMessage, hideMessage } from 'react-native-flash-message';





import {
    
    Feather,
   
  } from '@expo/vector-icons';

const Notes = ({notes,id}) => {
    const [visible, setVisible] = React.useState(false);
    const app = useContext(AppContext);
    var  addNote = app.addNote;
    var  deleteNote = app.deleteNote;

    var  myaccountinfo=app. myaccountinfo
    const [content, setContent] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [err, setErr] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [message, setMessage] = React.useState(null);



const handleAddNote = () => {
    setVisible(true)
}

const handleSendNote = (content,docname,docsize,docurl,doctype) => {

var attachment=""
  addNote(setModalVisible,setMessage,setLoading,setSuccess,setErr,id,content,docname,docsize,docurl,doctype)
 
}

const handleDeletedNote = (item) => {
  
  var noteId=item.id
 deleteNote(setModalVisible,setMessage,setLoading,setSuccess,setErr,id,noteId)
   
  }


const downloadFile=()=> {
  FileSystem.downloadAsync(
   'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
   FileSystem.documentDirectory + 'small.pdf'
 )
   .then(({ uri }) => {
     console.log('Finished downloading to ', uri);
   })
   .catch(error => {
     console.error(error);
   });

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
    <View>
      <View style={styles.btncotainer}>
        <TouchableOpacity onPress={handleAddNote} style={styles.btn}>
          <Text style={styles.btntxt}>Add Note</Text>
        </TouchableOpacity>
       
      </View>
      <View>
      {notes?.length ==null ? <Text style={{color:"rgba(46, 58, 89, 0.7)",textAlign:"center",marginBottom:40,fontSize:12}}>Note note availble for this project</Text>:
        <>
        {notes?.map((item) => 
        <View key={item.id} style={styles.notebox}>
       
            <Image style={styles.img} source={Pic} />
            <View style={styles.sec1}>
              <Text style={styles.txtac}>{item?.first_name} {item?.last_name}</Text>
              <Text style={styles.txtb}> {moment(item?.created_at).format(
                            'MM-DD-YY, h:mm:ss a'
                          )}</Text>
              {notes,myaccountinfo?.id==item?.user_id &&
               <TouchableOpacity onPress={()=>handleDeletedNote(item)} style={styles.downloadbox2}>
              <Feather
                  name='trash'
                  color='red'
                  size={12}
                />
              <Text style={styles.delete}> Delete </Text>
              </TouchableOpacity>
}
            </View>
            <View style={styles.sec2}>
              <Text style={styles.txta}>{item?.content}</Text>
           
              <TouchableOpacity onPress={downloadFile} style={styles.downloadbox}>
              <Feather
                  name='download'
                  color='#66C825'
                  size={12}
                />
              <Text style={styles.download}> Download Attatchment </Text>
              </TouchableOpacity>
           
            </View>
            </View>)
           
        }
       </>
          
}
        </View>
       
      
        <AddNote handleSendNote={handleSendNote}  setFile={setFile} modalVisible={visible} setModalVisible={setVisible}/>
    </View>
  );
};
const styles = StyleSheet.create({
  btncotainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom:20
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
  notebox:{
      display:'flex',
      flexDirection:"row",
      alignItems:"center",
      marginTop:10,
      paddingBottom:15,
      borderBottomColor: 'rgba(220,220,220,0.4)',
      borderBottomWidth: 1,
     
      
 
  },
  img:{
      width:35,
      height:35,
      borderRadius:50,
      marginRight:10
  },
  txta:{
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    color: '#000',
  
  },
  txtac:{
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    color: '#000',
    textTransform:"capitalize"
  },
  txtb:{
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(46, 58, 89, 0.7)',
  },
  sec1:{
      marginRight:10,
      width:"40%",
   
      
  },
  sec2:{
   
    width:"50%",
 
},
downloadbox:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
},
download:{
    color:"#66C825",
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
},
downloadbox2:{
  display:"flex",
  flexDirection:"row",
  alignItems:"center",
  marginTop:3
},
delete:{
  color:"red",
  fontSize: 10,
  fontFamily: 'Nunito_600SemiBold',
}
  
});

export default Notes;
