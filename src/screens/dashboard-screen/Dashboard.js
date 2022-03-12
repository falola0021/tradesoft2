import 'react-native-gesture-handler';

import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopNav from '../../components/topnav/Nav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../../App';
import { useFocusEffect } from '@react-navigation/native';

import Dashboard from '../../components/dashboard-pages/Dashboard';
import Projects from '../../components/dashboard-pages/Projects';
import ThirdPage from '../../components/dashboard-pages/page3';
import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
  Octicons,
  Ionicons,
  MaterialIcons,
  Fontisto
} from '@expo/vector-icons';

// Import Custom Sidebar
import CustomSidebarMenu from '../../components/side-menu/Sidebar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function FirstScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName='Dashboard'>
      <Stack.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          header: () => <TopNav navigationProps={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
}

function SecondScreenStack({ navigation }) {
  const [isLongPressed, setIsLongPressed] = useState(true);
  useEffect(() => {
    if (isLongPressed) {
      setIsLongPressed(false);
    }
  }, [isLongPressed]);
  return (
    <Stack.Navigator
      initialRouteName='Projects'
      screenOptions={{
        header: () => <TopNav navigationProps={navigation} />,
      }}
    >
      <Stack.Screen
        name='Projects'
        component={Projects}
        options={{
          title: 'Projects', //Set Header Title
        }}
      />
      <Stack.Screen
        name='ThirdPage'
        component={ThirdPage}
        options={{
          title: 'Third Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function Dashboarddd() {
  const app = useContext(AppContext);
  var logout = app.logout;
  const success = app.success;
  const [message, setMessage] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              logout(setMessage);
              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        screenOptions={{
          drawerStyle: {
            width: '68%',
          },
          drawerItemStyle: {
            paddingBottom: 12,
            paddingTop: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: '#66C825',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            drawerActiveBackgroundColor: 'red',
          },

          drawerActiveBackgroundColor: '#fff',
          drawerActiveTintColor: '#66C825',
          drawerInactiveTintColor: '#bdbdbd',
        }}
      >
        <Drawer.Screen
          name='Dashboard'
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={'view-dashboard-outline'}
                size={16}
                color={color}
              />
            ),
          }}
          component={FirstScreenStack}
        />
        <Drawer.Screen
          name='Projects'
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Octicons name={'project'} size={16} color={color} />
            ),
          }}
          component={SecondScreenStack}
        />
        <Drawer.Screen
          name='Message'
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <FontAwesome name={'envelope-o'} size={16} color={color} />
            ),
          }}
          
          component={SecondScreenStack}
        />
        <Drawer.Screen
          name='Calendar'
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Octicons name={'calendar'} size={16} color={color} />
            ),
          }}
          component={SecondScreenStack}
        />
        <Drawer.Screen
          name='Rams'
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Ionicons name={'medkit-outline'} size={16} color={color} />
            ),
          }}
          component={SecondScreenStack}
        />
        <Drawer.Screen
          name='Media'
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <MaterialIcons name={'perm-media'} size={16} color={color} />
            ),
          }}
          component={SecondScreenStack}
        />
        <Drawer.Screen
          name='Holiday'
          options={{
            headerShown: false,
            drawerIcon: ({ color }) => (
              <Fontisto name={'holiday-village'} size={16} color={color} />
            ),
          }}
          component={SecondScreenStack}
        />
      </Drawer.Navigator>
    </>
  );
}

export default Dashboarddd;
