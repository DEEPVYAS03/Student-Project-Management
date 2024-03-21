import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Text, View, Image, Touchable, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Button from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import {useUser} from '../../context/allContext';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AddFriend from './AddFriend';
import UserChat from './UserChat';
import {useState} from 'react';
import axios from 'axios';
import ipconstant from '../../ipconstant/ipconstant';
import ChatMessagesScreen from './ChatMessagesScreen';

const Stack = createStackNavigator();

const ChatMainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatMain" component={ChatMainScreen} />
      <Stack.Screen name="AddFriend" component={AddFriend} />
      <Stack.Screen name="Messages" component={ChatMessagesScreen} />
    </Stack.Navigator>
  );
};

const ChatMainScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const navigation = useNavigation();
  const {name, email, college, selectedImage , userId} = useUser();


  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await axios.get(
          `${ipconstant}/api/get-all-friends/${userId}`,
        );
        console.log('Accepted Friends:', response.data);
        setAcceptedFriends(response.data.friends);
      } catch (err) {
        console.log(err);
      }
    };
    acceptedFriendsList();
  }, []);



  return (
    <View style={tw`h-full relative`}>
      {/* Header*/}

      <View style={tw`mt-5 ml-2 flex flex-row  mr-5`}>
        <Feather
          name="arrow-left"
          size={24}
          color="black"
          onPress={() => navigation.navigate('Home')}
        />
        <View style={tw`flex flex-row w-80 justify-center`}>
          <Text style={tw`text-black text-center font-bold text-lg`}>
            Chats
          </Text>
        </View>
      </View>

      <View style={tw`mt-3`}></View>

      {/* Main chat screen  */}

      {/* Box */}

      <ScrollView showsHorizontalScrollIndicator ={false}>
        <Pressable>
          {acceptedFriends.map((item,index) => (
            <UserChat key={index} item={item}/>
          ))}
        
        </Pressable>

      </ScrollView>
      {/* Add Friend icon */}
      <View
        style={tw`absolute bottom-10 right-7 bg-yellow-500 w-15 h-15 rounded-xl flex justify-center items-center`}>
        <TouchableOpacity onPress={() => navigation.navigate('AddFriend')}>
          <Feather name="user-plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

export default ChatMainStack;