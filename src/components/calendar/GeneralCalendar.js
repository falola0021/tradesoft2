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
  let date=moment()

 let today_date = moment(Date(date)).format('YYYY-MM-DD');

  return (
    <View style={{ flex: 1 }}>
      <Agenda
      
        items={items}
        selected={ today_date }
        current={today_date}
        renderItem={renderItem}

          // hideExtraDays={true}
          firstDay={1}
          disableAllTouchEventsForDisabledDays={true}
          displayLoadingIndicator={false}
          pastScrollRange={100}
          futureScrollRange={10}
          monthFormat={'MMM-yyyy'}
          hideExtraDays={true}
          disableMonthChange={true}
          theme={{
            // calendarBackground: '#166088',
  
            selectedDayBackgroundColor: '#66C825',
            selectedDayTextColor: '#fff',
            selectedDotColor: '#66C825',
  
            // dayTextColor: '#DBE9EE',
            textDisabledColor: '#729DAF',
            dotColor: '#66C825',
            dotStyle: { width: 50, height: 5 },

  
            // monthTextColor: '#DBE9EE',
            textMonthFontWeight: 'bold',
  
            // arrowColor: '#DBE9EE',
          }}
      />
    </View>
  );
};

export default Cal;

const styles = StyleSheet.create({});
