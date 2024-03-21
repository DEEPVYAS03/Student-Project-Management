import React, {useState} from 'react';
import { LogBox } from 'react-native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import tw from 'twrnc';
import {Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const ProjectManagement = () => {
  const navigation = useNavigation();
  const [smile, setSmile] = useState(false);
  const [smilec, setSmilec] = useState(0);

  const [like, setLike] = useState(false);
  const [likec, setLikec] = useState(0);

  const [angry, setAngry] = useState(false);
  const [angryc, setAngryc] = useState(0);
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
  return (
    <View >
      <ScrollView style={tw`flex-1`}>
        {/* abdail */}
        <View style={tw`flex flex-row mt-5 ml-3`}>
          <Image
            style={tw`w-13 h-13 `}
            source={require('../assets/images/Projectmanagement/user2.png')}
          />
          <View>
            <View>
              <Text style={tw`ml-3 mt-2 font-bold text-black`}>Abigail</Text>
              <Text style={tw`ml-3 text-[#4F7396]`}>1m ago</Text>
            </View>
          </View>
        </View>

        {/* abdail ke niche ka text */}

        <View style={tw`mt-2 `}>
          <Text style={tw`text-black ml-4 text-lg`}>
            Here's the glimpse of the project we are working on. Let me know if you have any suggestions.
          </Text>
        </View>

        {/* Image */}

        <View>
          <Image
            style={tw`m-3 w-90 h-50 rounded-xl border border-black `}
            source={require('../assets/ml.jpg')}
          />
        </View>

        {/* View Document */}

        {/* <TouchableOpacity style={tw`m-3 bg-gray-200 w-90 p-4 rounded-3xl`}>
          <Text style={tw`text-black font-bold ml-3 text-center `}>
            View Document
          </Text>
        </TouchableOpacity> */}

        {/* Aidan */}

        <View style={tw`flex flex-row mt-5 ml-3`}>
          <Image
            style={tw`w-13 h-13 `}
            source={require('../assets/images/Projectmanagement/user3.png')}
          />
          <View>
            <View>
              <Text style={tw`ml-3 mt-2 font-bold text-black`}>Abigail</Text>
              <Text style={tw`ml-3 text-[#4F7396]`}>1m ago</Text>
            </View>
          </View>
        </View>

        {/* Icons */}

        <View style={tw`mt-3 ml-5 flex flex-row`}>
          {/* like */}
          <View style={tw`flex flex-row`}>
            <TouchableOpacity
              onPress={() => {
                setLike(isLiked => !isLiked);
                setLikec(like ? likec - 1 : likec + 1);
              }}>
              <MaterialCommunityIcons
                name={like ? 'heart' : 'heart-outline'}
                size={25}
                color="#4F7396"
              />
            </TouchableOpacity>
            <Text style={tw`ml-1 text-xl text-[#4F7396] mr-8`}>{likec}</Text>
          </View>

          {/* smiley */}
          <View style={tw`flex flex-row`}>
            <TouchableOpacity
              onPress={() => {
                setSmile(isSmiled => !isSmiled);
                setSmilec(smile ? smilec - 1 : smilec + 1);
              }}>
              <MaterialCommunityIcons
                name={smile ? 'emoticon' : 'emoticon-happy-outline'}
                size={25}
                color="#4F7396"
              />
            </TouchableOpacity>
            <Text style={tw`ml-1 text-xl text-[#4F7396] mr-8`}>{smilec}</Text>
          </View>

          {/* angry */}
          <View style={tw`flex flex-row`}>
            <TouchableOpacity
              onPress={() => {
                setAngry(isAngry => !isAngry);
                setAngryc(angry ? angryc - 1 : angryc + 1);
              }}>
              <MaterialCommunityIcons
                name={angry ? 'emoticon-angry' : 'emoticon-angry-outline'}
                size={25}
                color="#4F7396"
              />
            </TouchableOpacity>
            <Text style={tw`ml-1 text-xl text-[#4F7396] mr-8`}>{angryc}</Text>
          </View>
        </View>

        {/* Text below icons */}
        <View>
          <Text style={tw`ml-4 mt-2 text-lg text-black`}>
            Very good work. Keep it up!
          </Text>
        </View>
        <View style={tw`flex flex-row mt-5 ml-3`}>
          <Image
            style={tw`w-13 h-13 `}
            source={require('../assets/images/Projectmanagement/user2.png')}
          />
          <View>
            <View>
              <Text style={tw`ml-3 mt-2 font-bold text-black`}>Jonnathan</Text>
              <Text style={tw`ml-3 text-[#4F7396]`}>1d ago</Text>
            </View>
          </View>
        </View>

        {/* abdail ke niche ka text */}

        <View style={tw`mt-2 `}>
          <Text style={tw`text-black ml-4 text-lg`}>
            Completed the task. Please review it.
          </Text>
        </View>

        {/* Image */}

        <View>
          <Image
            style={tw`m-3 w-90 h-50 rounded-xl`}
            source={require('../assets/images/frontenddev.jpg')}
          />
        </View>

        {/* View Document */}

        {/* <TouchableOpacity style={tw`m-3 bg-gray-200 w-90 p-4 rounded-3xl`}>
          <Text style={tw`text-black font-bold ml-3 text-center `}>
            View Document
          </Text>
        </TouchableOpacity> */}

        {/* Aidan */}

        <View style={tw`flex flex-row mt-5 ml-3`}>
          <Image
            style={tw`w-13 h-13 `}
            source={require('../assets/images/Projectmanagement/user3.png')}
          />
          <View>
            <View>
              <Text style={tw`ml-3 mt-2 font-bold text-black`}>George</Text>
              <Text style={tw`ml-3 text-[#4F7396]`}>5m ago</Text>
            </View>
          </View>
        </View>

        {/* Icons */}

        <View style={tw`mt-3 ml-5 flex flex-row`}>
          {/* like */}
          <View style={tw`flex flex-row`}>
            <TouchableOpacity
              onPress={() => {
                setLike(isLiked => !isLiked);
                setLikec(like ? likec - 1 : likec + 1);
              }}>
              <MaterialCommunityIcons
                name={like ? 'heart' : 'heart-outline'}
                size={25}
                color="#4F7396"
              />
            </TouchableOpacity>
            <Text style={tw`ml-1 text-xl text-[#4F7396] mr-8`}>{likec}</Text>
          </View>

          {/* smiley */}
          <View style={tw`flex flex-row`}>
            <TouchableOpacity
              onPress={() => {
                setSmile(isSmiled => !isSmiled);
                setSmilec(smile ? smilec - 1 : smilec + 1);
              }}>
              <MaterialCommunityIcons
                name={smile ? 'emoticon' : 'emoticon-happy-outline'}
                size={25}
                color="#4F7396"
              />
            </TouchableOpacity>
            <Text style={tw`ml-1 text-xl text-[#4F7396] mr-8`}>{smilec}</Text>
          </View>

          {/* angry */}
          <View style={tw`flex flex-row`}>
            <TouchableOpacity
              onPress={() => {
                setAngry(isAngry => !isAngry);
                setAngryc(angry ? angryc - 1 : angryc + 1);
              }}>
              <MaterialCommunityIcons
                name={angry ? 'emoticon-angry' : 'emoticon-angry-outline'}
                size={25}
                color="#4F7396"
              />
            </TouchableOpacity>
            <Text style={tw`ml-1 text-xl text-[#4F7396] mr-8`}>{angryc}</Text>
          </View>
        </View>

        {/* Text below icons */}
        <View>
          <Text style={tw`ml-4 mt-2 text-lg text-black`}>
            Would you like to have a meeting to discuss the project?
          </Text>
        </View>

        {/* comment */}

        <View style={tw`flex flex-row mt-3`}>
          <Image
            style={tw` ml-2 w-11 h-11 `}
            source={require('../assets/images/Projectmanagement/user1.png')}
          />
          <TextInput
            style={tw`bg-[#E8EDF2] w-70 h-13 pl-5 ml-2 rounded-xl text-[#4F7396]`}
            placeholder="Write a comment"
            placeholderTextColor={'#4F7396'}
          />

          <TouchableOpacity style={tw`ml-2 mt-2`}>
            <MaterialCommunityIcons name="send" size={30} color="#4F7396" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Pressable
        onPress={() => navigation.navigate('Chatbot')}
        style={{
          borderRadius: 50,
          marginBottom: 30,
          marginRight: 19,
        }}>
        <Button
          name="robot"
          size={25}
          style={{
            position: 'absolute',
            backgroundColor: '#f0c44d',
            paddingHorizontal: 15,
            paddingVertical: 17,
            border:1,
            borderRadius: 30,
            bottom: 5,
            right: 5,
            color: 'black',
           
          }}></Button>
      </Pressable>
    </View>
  );
};

export default ProjectManagement;