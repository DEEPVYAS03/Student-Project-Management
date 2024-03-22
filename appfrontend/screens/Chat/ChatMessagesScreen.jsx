import React, {useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Image,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useUser} from '../../context/allContext';
import {useRoute} from '@react-navigation/native';
import {useState} from 'react';
import axios from 'axios';
import ipconstant from '../../ipconstant/ipconstant';
import {Ionicons} from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ChatMessagesScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {recepientId} = route.params;
  const [selectedImage, setSelectedImage] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const {userId, setUserId} = useUser();
  const [recepientData, setRecepientData] = useState();

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${ipconstant}/api/messages/${userId}/${recepientId}`,
      );
      const data = await response.data;
      console.log('Messages:', data);
      setMessages(data);
      

    } catch (error) {
      console.log('Error in fetching the messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    fetchRecepientData();
  }, []);

  const fetchRecepientData = async () => {
    try {
      const response = await axios.get(`${ipconstant}/api/user/${recepientId}`);
      const data = await response.data;
      console.log('Hello from the recepient data:');
      setRecepientData(data);
    } catch (error) {
      console.log('Error in fetching the recepient data', error);
    }
  };

  const handleSend = async (messageType, imageUri) => {
    try {
      const formData = new FormData();
      formData.append('senderId', userId);
      formData.append('recepientId', recepientId);

      //if the message type id image or a normal text
      if (messageType === 'image') {
        formData.append('messageType', 'image');
        formData.append('imageFile', {
          uri: imageUri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      } else {
        formData.append('messageType', 'text');
        formData.append('messageText', message);
      }

      const response = await fetch(`${ipconstant}/api/messages`, {
        method: "POST",
        body: formData,
      }  
      );

      if (response.ok) {
        setMessage('');
        setSelectedImage('');

        fetchMessages();
      }
    } catch (error) {
      console.log('error in sending the message', error);
    }
  };

  console.log('messages', messages);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Image
            source={require('../../assets/images/Profile/default_profile.jpg')}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              resizeMode: 'cover',
            }}
          />
        </View>
      ),
    });
  });

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#F0F0F0'}}>
      {/* Back button */}

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#E0E0E0',
          height: 65,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/Profile/default_profile.jpg')}
          style={{width: 40, height: 40, borderRadius: 20}}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
          {recepientData?.name}
        </Text>
      </View>

      <ScrollView>
      {messages?.map((item, index) => {
          if (item.messageType === "text") {
            return (
              <Pressable
              key={index}
                style={[
                  item?.senderId?._id === userId? {alignSelf: "flex-end",backgroundColor:'#DCF8C6',
                  padding:8,
                  maxWidth: '60%',
                  borderRadius:7,
                  margin:10
                } : 
                {alignSelf: "flex-start",
                backgroundColor:'white',
                padding:8,
                margin:10,
                borderRadius:7,
                maxWidth: '60%'
              },
                ]}
              >
                <Text>{item?.message}</Text>
              </Pressable>
            );
          }

         
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E0E0E0',
          height: 65,
        }}>
        <TextInput
          value={message}
          placeholder="Type your messages"
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 50,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 30,
            marginTop: 3,
            paddingHorizontal: 20,
          }}></TextInput>

        <Entypo
          name="attachment"
          size={22}
          color="black"
          style={{marginRight: 10}}
        />

        <FontAwesome
          name="camera"
          size={22}
          color="black"
          style={{marginRight: 10}}
        />

        <FontAwesome
          name="microphone"
          size={22}
          color="black"
          style={{marginRight: 10}}
        />

        <Pressable
          onPress={() => handleSend('text')}
          style={{
            marginRight: 5,
            backgroundColor: '#f0c44d',
            padding: 10,
            borderRadius: 20,
          }}>
          <Text>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;