import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Cal = () => {
  const [items, setItems] = useState({});

  //  const loadItems = (day) => {
  //    setTimeout(() => {
  //      for (let i = -15; i < 15; i++) {
  //        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //        const strTime = timeToString(time);
  //        if (!items[strTime]) {
  //          items[strTime] = [];
  //          const numItems = Math.floor(Math.random() * 3 + 1);
  //          for (let j = 0; j < numItems; j++) {
  //            items[strTime].push({
  //              name: 'Item for ' + strTime + ' #' + j,
  //              height: Math.max(50, Math.floor(Math.random() * 150)),
  //            });
  //          }
  //        }
  //      }
  //     //  const newItems = {};
  //     //  Object.keys(items).forEach((key) => {
  //     //    newItems[key] = items[key];
  //     //  });
  //      //setItems(newItems);
  //    }, 1000);
  //  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{item.name}</Text>
              <Text style={{color:"green",fontSize:10}}>in progress</Text>
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
        markingType={'period'}
        minDate='2012-05-16'
        maxDate='2012-05-17'
        markedDates={{
          '2012-05-16': {
            selected: true,
            marked: true,
            textColor: 'grey',
            color: '#F1E130',
          },
          '2012-05-17': {
            marked: true,
            selected: true,
            textColor: 'grey',
            color: '#F1E130',
          },
        }}
        items={{
          '2012-05-16': [{ name: 'Installing new bathrooms' }],
          '2012-05-17': [{ name: 'Fix broken kitchen pipes', height: 80 }],
        }}
        //  items={items}
        loadItemsForMonth={(month) => {
          console.log('trigger items loading');
        }}
        selected={'2012-05-16'}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Cal;

const styles = StyleSheet.create({});

// import React, {useState} from 'react';
// import {View, TouchableOpacity} from 'react-native';
// import {Agenda} from 'react-native-calendars';
// import {Card, Avatar} from 'react-native-paper';
// import Typography from '../components/Typography';

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split('T')[0];
// };

// const Schedule = () => {
//   const [items, setItems] = useState({});

//   const loadItems = (day) => {
//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);
//         if (!items[strTime]) {
//           items[strTime] = [];
//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             items[strTime].push({
//               name: 'Item for ' + strTime + ' #' + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//             });
//           }
//         }
//       }
//       const newItems = {};
//       Object.keys(items).forEach((key) => {
//         newItems[key] = items[key];
//       });
//       setItems(newItems);
//     }, 1000);
//   };

//   const renderItem = (item) => {
//     return (
//       <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
//         <Card>
//           <Card.Content>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <Typography>{item.name}</Typography>
//               <Avatar.Text label="J" />
//             </View>
//           </Card.Content>
//         </Card>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Agenda
//         items={items}
//         loadItemsForMonth={loadItems}
//         selected={'2017-05-16'}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default Schedule;

// // import { ScrollView, StyleSheet, Text, View } from 'react-native'
// // import React from 'react'
// // import { Calendar } from 'react-native-big-calendar'
// //  import moment from 'moment';

// // const Cal= () => {
// //   const events = [
// //     {
// //       title: 'Meeting',
// //       start: new Date(2022, 1, 11, 10, 0),
// //       end: new Date(2022, 1, 11, 10, 30),
// //     },
// //     {
// //       title: 'Coffee break ',
// //       start: new Date(2022, 4, 11, 0, 0),
// //       end: new Date(2022, 4, 18, 0, 0),
// //     },
// //   ]

// //   // const dayFormat = (date, culture, localizer) => localizer.format(date, 'D MMMM YYYY', culture);

// //   return (
// //     <View style={{flex:1}}>
// //       <ScrollView showsVerticalScrollIndicator={false}>
// //      <Calendar

// //   // headerComponent={true}
// //     //  hideNowIndicator={true}
// // mode='month'
// // // date={"2022-09-22"}
// //  events={events}
// //      height={600}
// //      />
// //      </ScrollView>
// //     </View>
// //   )
// // }

// // export default Cal

// //const styles = StyleSheet.create({})

// import React, { useEffect, useState, useRef, useContext } from 'react';

// import { StyleSheet, Text, View } from 'react-native'
//  import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
//  import moment from 'moment';

// const Cal = ({projectDetails}) => {
//   const [startdate, setStartdate] = React.useState(null);
//   const [enddate, setEnddate] = React.useState(null);

//   useEffect(() => {
//     let formateStartDate=moment(
//       projectDetails?.project_info?.start_date?.date
//     ).format('YYYY-MM-DD')
//     let b=JSON.stringify(formateStartDate);
//     setStartdate(b)

//     let formatEnddate=moment(
//       projectDetails?.project_info?.end_date?.date
//     ).format('YYYY-MM-DD')
//     setEnddate(formatEnddate)
//   },[])

// console.log(startdate)
// console.log(enddate)

//   return (
//     <View style={{  flex: 1 }}>

// <Agenda
//           //items={Object.assign({}, this.state.EventData)}
//           selected={today_date}
//           current={today_date}
//           //minDate={today_date}
//           renderItem={this.renderItem.bind(this)}
//           renderEmptyData = {() => {return (<View>
//             <Text style={{alignSelf:'center'}}>No Task on this date!</Text>
//             </View>);}}
//           rowHasChanged={this.rowHasChanged.bind(this)}
//           hideExtraDays={true}
//           firstDay={1}
//           disableAllTouchEventsForDisabledDays={true}
//           displayLoadingIndicator={false}
//           pastScrollRange={100}
//           futureScrollRange={10}
//           monthFormat={'MMM-yyyy'}
//           theme={{
//             backgroundColor: '#ffffff',
//             calendarBackground: '#ffffff',
//             textSectionTitleColor: 'black',
//             textSectionTitleDisabledColor: '#d9e1e8',
//             selectedDayBackgroundColor: '#00adf5',
//             selectedDayTextColor: '#ffffff',
//             todayTextColor: '#00adf5',
//             dayTextColor: '#2d4150',
//             textDisabledColor: '#d9e1e8',
//             dotColor: '#00adf5',
//             selectedDotColor: '#ffffff',
//             arrowColor: 'green',
//             disabledArrowColor: '#d9e1e8',
//             monthTextColor: 'black',
//             indicatorColor: 'blue',
//             textDayFontSize: scale(16),
//             textMonthFontSize: scale(16),
//             textDayHeaderFontSize: scale(14),
//             agendaKnobColor: 'green',
//             agendaDayTextColor: 'black',
//             agendaDayNumColor: 'green',
//             agendaTodayColor: 'red',
//             'stylesheet.calendar.header': {
//               week: {
//                 marginTop: scale(10),
//                 marginBottom: scale(10),
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               },
//             },
//           }}
//           renderKnob={() => {
//             return (
//               <View
//                 style={{
//                   height: scale(6),
//                   width: scale(45),
//                   backgroundColor: 'green',
//                   borderRadius: 4,
//                   borderWidth: 1,
//                   borderColor: 'green',
//                 }}
//               />
//             );
//           }}
//         />

//        {/* <Calendar
//         markingType={'period'}
//        current={startdate}
//        minDate={startdate}
//        maxDate={enddate}
//        selected = {startdate}

//         markedDates={{

//           startdate: {startingDay: true, color: '#F1E22E', textColor: '#000'},
//           '2020-09-22': {color: '#F1E22E', textColor: '#000'},
//           '2020-09-23': {color: '#F1E22E', textColor: '#000'},
//           '2020-09-24': {color: '#F1E22E', textColor: '#000'},
//           enddate: {endingDay: true, color: '#F1E22E', textColor: '#000'}
//         }}

// /> */}
//       </View>
//   )
// }

// export default Cal

// const styles = StyleSheet.create({})
