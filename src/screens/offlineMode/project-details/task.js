import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useEffect, useState, useRef, useContext } from 'react';



const Task = ({tasksoff}) => {

 
  return (
    <View style={{backgroundColor:"#fff",minHeight:500,paddingTop:20}}>
       

       <FlatList
                 
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                  legacyImplementation={false}
                  data={tasksoff}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <View style={{borderBottomColor:"rgba(	128, 128, 128,0.1)",borderBottomWidth:1,paddingTop:7,padding:5}}>
                    <View style={{marginBottom:7}}>
                    <Text style={{fontSize:12,fontWeight:"bold",color:"#66C825",fontFamily: 'Nunito_600SemiBold'}}>Task : <Text style={{ fontSize: 10,
                  fontWeight:"400",textTransform:'capitalize',
                  color: 'rgba(46, 58, 89, 0.7)'}}>{item?.title}</Text></Text>
                 
                    </View>
                   
                    <View style={{marginBottom:7}}>
                    <Text style={{fontSize:12,fontWeight:"bold",color:"#66C825",fontFamily: 'Nunito_600SemiBold'}}>Task Description : </Text>
                   {item.details &&
                    <Text style={{ fontSize: 10,
                  fontWeight:"400",
                  color: 'rgba(46, 58, 89, 0.7)'}}>{item?.details.replace(/\\n/g,'\n')}</Text>
                    }
                    </View>
                    <View style={{marginBottom:7}}>
                    <Text style={{fontSize:12,fontWeight:"bold",color:"#66C825",fontFamily: 'Nunito_600SemiBold'}}>Start Date : <Text style={{ fontSize: 10,
                  fontWeight:"400",
                  color: 'rgba(46, 58, 89, 0.7)'}}>{item?.start}</Text></Text>
                 
                    </View>
                    <View style={{marginBottom:7}}>
                    <Text style={{fontSize:11,fontWeight:"bold",color:"#66C825", fontFamily: 'Nunito_600SemiBold'}}>End Date : <Text style={{ fontSize: 10,
                  fontWeight:"400",
                  color: 'rgba(46, 58, 89, 0.7)'}}>{item?.end}</Text></Text>
                 
                    </View>
                    </View>
                  )}
                    />


    
    </View>
  )
}

export default Task

const styles = StyleSheet.create({})