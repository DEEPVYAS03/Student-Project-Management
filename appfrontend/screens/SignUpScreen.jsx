import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon, MapPinIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import axios from 'axios';
import Button from 'react-native-vector-icons/FontAwesome';
import {Root, Popup} from 'popup-ui';
import ipconstant from '../ipconstant/ipconstant';
import {useUser} from '../context/allContext';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const {name, setName} = useUser();
  const {email, setEmail} = useUser();
  const {college, setCollege} = useUser();
  
  const [password, setPassword] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const signupHandler = async () => {
    try {
      if (
        name === '' ||
        email === '' ||
        password === '' ||
        confirmPassword === ''
      ) {
        Popup.show({
          type: 'Danger',
          title: 'Signup Failed',
          button: true,
          textBody: 'Enter valid details',
          buttonText: 'Try Again',
          callback: () => Popup.hide(),
        });
      } else if (password !== confirmPassword) {
        Popup.show({
          type: 'Danger',
          title: 'Passwords do not match',
          button: true,
          textBody: 'Please make sure passwords match',
          buttonText: 'Okay',
          callback: () => Popup.hide(),
        });
      } else {
        console.log('Entered the else block');
        const response = await axios.post(`${ipconstant}/api/createUser`, {
          name,
          email,
          password,
          college,
        });
        const data = await response.data;
        console.log('Signup data:', data);
        if (!data.success) {
          Popup.show({
            type: 'Danger',
            title: 'Signup Failed',
            button: true,
            textBody: data.error,
            buttonText: 'Try Again',
            callback: () => Popup.hide(),
          });
        } else {
          console.log('Signup success');
          navigation.navigate('Login');
        }
      }
    } catch (err) {
      console.log('Error:', err);
      Popup.show({
        type: 'Danger',
        title: 'Signup Failed',
        button: true,
        textBody: 'User already exists',
        buttonText: 'Try Again',
        callback: () => Popup.hide(),
      });
    }
  };

  return (
    <Root>
      <View style={tw`flex-1 bg-white pt-2`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}

          <SafeAreaView style={tw`flex `}>
            <View style={tw`flex-row justify-start`}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={tw`bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4`}>
                <ArrowLeftIcon size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row justify-center`}>
              <Image
                source={require('../assets/images/login.png')}
                style={{width: 200, height: 200}}
              />
            </View>
          </SafeAreaView>

          <View
            style={[
              tw`flex-1 bg-white px-8 pt-8`,
              {borderTopLeftRadius: 50, borderTopRightRadius: 50},
            ]}>
            {/* Name */}

            <View>
              <Text style={tw`text-gray-700 ml-2`}>Username: </Text>
              <View
                style={tw`flex flex-row border-b-[0.5px] mt-5 border-slate-400 ml-3 w-77`}>
                <Button name="user" size={20} color="black" />
                <TextInput
                  value={name}
                  placeholder="Enter your name"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  style={tw`flex-1 ml-5 -mt-3 text-black`}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* College name */}
            <View style={tw`mt-2`}>
              <Text style={tw`text-gray-700 ml-2`}>College Name: </Text>
              <View
                style={tw`flex flex-row border-b-[0.5px] mt-5 border-slate-400 ml-3 w-77`}>
                <Button name="university" size={20} color="black" />
                <TextInput
                  value={college}
                  placeholder="Enter your college name"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  style={tw`flex-1 ml-5 -mt-3 text-black`}
                  onChangeText={setCollege}
                />
              </View>
            </View>

            {/* Email */}

            <View style={tw`mt-2`}>
              <Text style={tw`text-gray-700 ml-2`}>Email Id: </Text>
              <View
                style={tw`flex flex-row border-b-[0.5px] mt-5 border-slate-400 ml-3 w-77`}>
                <Button name="envelope" size={20} color="black" />
                <TextInput
                  value={email}
                  placeholder="Enter your email id"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  style={tw`flex-1 ml-5 -mt-3 text-black`}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password */}

            <View style={tw`mt-3`}>
              <Text style={tw`text-gray-700 ml-2`}>Password: </Text>
              <View
                style={tw`flex flex-row border-b-[0.5px] mt-5 border-slate-400 ml-3 w-77`}>
                <Button name="lock" size={24} color="black" />
                {show1 ? (
                  <View style={tw`flex-1 flex-row`}>
                    <TextInput
                      value={password}
                      placeholder="Enter your password"
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      style={tw`flex-1 ml-5 -mt-3 text-black `}
                      onChangeText={setPassword}
                      secureTextEntry={!show1}
                    />
                    <Button
                      name="eye-slash"
                      size={24}
                      color="black"
                      onPress={() => setShow1(false)}
                    />
                  </View>
                ) : (
                  <View style={tw`flex-1 flex-row`}>
                    <TextInput
                      value={password}
                      placeholder="Enter your password"
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      style={tw`flex-1 ml-5 -mt-3 text-black `}
                      onChangeText={setPassword}
                      secureTextEntry={!show1}
                    />
                    <Button
                      name="eye"
                      size={24}
                      color="black"
                      onPress={() => setShow1(true)}
                    />
                  </View>
                )}
              </View>
            </View>

            {/* Confirm Password */}

            <View style={tw`mt-3`}>
              <Text style={tw`text-gray-700 ml-2`}>Confirm Password: </Text>
              <View
                style={tw`flex flex-row border-b-[0.5px] mt-5 border-slate-400 ml-3 w-77`}>
                <Button name="lock" size={24} color="black" />
                {show2 ? (
                  <View style={tw`flex-1 flex-row`}>
                    <TextInput
                      value={confirmPassword}
                      placeholder="Confirm your password"
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      style={tw`flex-1 ml-5 -mt-3 text-black`}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!show2}
                    />
                    <Button
                      name="eye-slash"
                      size={24}
                      color="black"
                      onPress={() => setShow2(false)}
                    />
                  </View>
                ) : (
                  <View style={tw`flex-1 flex-row`}>
                    <TextInput
                      value={confirmPassword}
                      placeholder="Confirm your password"
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      style={tw`flex-1 ml-5 -mt-3 text-black`}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!show2}
                    />
                    <Button
                      name="eye"
                      size={24}
                      color="black"
                      onPress={() => setShow2(true)}
                    />
                  </View>
                )}
              </View>
            </View>

            {/* Sign Up Button */}

            <View style={tw`mt-10`}>
              <TouchableOpacity
                onPress={signupHandler}
                style={tw`py-3 bg-yellow-400 rounded-xl mb-7 mt-2`}>
                <Text style={tw`text-xl font-bold text-center text-gray-700`}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Root>
  );
}