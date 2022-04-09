import React, { useState,useEffect,useContext } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import moment from 'moment';
import { AppContext } from '../../../App';

import { useNavigation } from '@react-navigation/native';



const Cal = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState({});
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const app = useContext(AppContext);

  var allLiveProjects = app.allLiveProjects;
  var  alltask = app. alltask;
  const [allitem, setAllitem] = React.useState(null);


  useEffect(() => {
      // run once
  const getData = async () => {
 const mappedData = alltask.map((item, index) => {
          const date = moment(item?.start).format(
            'YYYY-MM-DD'
          )
          return {
            ...item,
            date: date,
          };
        });
    
  
        const reduced = mappedData.reduce(
          (acc, currentItem) => {
            const {date, ...coolItem} = currentItem;
  
            acc[date] = [coolItem];
  
            return acc;
          },
          {},
        );
  
        setItems(reduced);
      };
  
      getData();
    }, []);


  

    const handleFilter = (item) => {
      var id=item.project_id
     let b = allLiveProjects?.find((item) => item.id == id);
     return b
    
    }

  


  const handleNavigateToDetails = async(item) => {

   var getFilter = await handleFilter(item)
  
      let details= getFilter
     navigation.navigate('ProjectDetails',{details})

  };


  const renderItem = (item) => {
    return (
      <TouchableOpacity onPress={()=>handleNavigateToDetails(item)} style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'center',
              }}
            >
               <Text style={{ color: '#66C825',
               fontSize: 14,
                 fontFamily: 'GilroyBold',marginBottom:10}}>{item.title}</Text>
              <Text style={{ color: '#000',
                fontSize: 11,
              }}>{item.details}</Text>
               <Text style={{color:"green",fontSize:11,marginTop:5}}>Start Date: <Text style={{color:"#000"}}>{item.start}</Text></Text>
               <Text style={{color:"green",fontSize:11,marginTop:5}}>End Date: <Text style={{color:"#000"}}>{item.end}</Text></Text>


              <Text style={{color:"green",fontSize:10,marginTop:5}}>Status: <Text style={{color:"#000"}}>{item.completed_at?"Completed":"In Progress"}</Text></Text>
              {/* <Avatar.Text label='progress' size={30} style={{backgroundColor:"#F1E130"}} /> */}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        //markingType={'period'}
        
        items={items}
        //  items={items}
        // loadItemsForMonth={(month) => {
        //   console.log('trigger items loading');
        // }}
        selected={'2021-02-01'}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Cal;

const styles = StyleSheet.create({});
