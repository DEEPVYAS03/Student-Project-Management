import React, {useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import tw from 'twrnc';
import {Root, Popup} from 'popup-ui';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ProjectManagement from './Feed';
import {useUser} from '../context/allContext';
import Feather from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TaskScreen from './TaskScreen';
import ProjectsScreen from './Projects/ProjectsScreen';
import ProfileScreen from './ProfileScreen';
import ChatMainScreen from './Chat/ChatMainScreen';
import FriendReq from './FriendReq';
import Feed from './Feed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Antdesign from 'react-native-vector-icons/AntDesign';
import MeetingScreen from './MeetingScreen';

const Tab = createBottomTabNavigator();

const Homestack = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: 'black', fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Feather name="home" size={24} color="#f0c44d" />
            ) : (
              <Feather name="home" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Tasks"
        component={TaskScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarLabelStyle: {color: 'black', fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Feather name="list" size={24} color="#f0c44d" />
            ) : (
              <Feather name="list" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Meeting"
        component={MeetingScreen}
        options={{
          tabBarLabel: 'Meetings',
          tabBarLabelStyle: {color: 'black', fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Feather name="video" size={24} color="#f0c44d" />
            ) : (
              <Feather name="video" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          tabBarLabel: 'Projects',
          tabBarLabelStyle: {color: 'black', fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Feather name="briefcase" size={24} color="#f0c44d" />
            ) : (
              <Feather name="briefcase" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {color: 'black', fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Feather name="user" size={24} color="#f0c44d" />
            ) : (
              <Feather name="user" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const {name, setName} = useUser();

  useEffect(() => {
    Popup.show({
      type: 'Success',
      title: 'Welcome',
      button: true,
      textBody: `Welcome ${name}`,
      buttonText: 'Start Exploring',
      callback: () => Popup.hide(),
    });
  }, []);

  return (
    <Root >
      {/*header  */}

      <View style={tw``}>
        <View style={tw`mt-4 -ml-12 flex h-12 flex-row  `}>

          <Text style={tw`text-black font-bold ml-18 text-lg font-20`}>
            Feed
          </Text>
        </View>
        <Feather
          onPress={() => navigation.navigate('FriendReq')}
          name="bell"
          size={24}
          color="black"
          style={tw`absolute top-5 right-17`}
        />
        <Feather
          onPress={() => navigation.navigate('ChatMain')}
          name="message-square"
          size={24}
          color="black"
          style={tw`absolute top-5 right-5`}
        />
      </View>

      <View style={tw`flex-1 justify-center items-center `}>
        <Feed />
        
      </View>
    </Root>
  );
};

export default Homestack;