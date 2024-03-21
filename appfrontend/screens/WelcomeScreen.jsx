import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';


export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-[#877dfa]`} >
      <View style={tw`flex-1 flex justify-around my-4 bg-#877dfa`}>
        <Text style={tw`text-white font-bold text-4xl text-center`}>
          Let's Get Started!
        </Text>
        <View style={tw`flex-row justify-center`}>
          <Image source={require('../assets/images/welcome.png')} style={{ width: 350, height: 350 }} />
        </View>
        <View >
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={tw`py-3 bg-yellow-400 mx-7 rounded-xl`}
          >
            <Text style={tw`text-xl font-bold text-center text-gray-700`}>
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
            <View style={tw`flex-row justify-center gap-2 mt-2`}>
              <Text style={tw`text-white font-medium text-lg  `}>Don't have an account? 
                </Text>
              <Text style={tw`mx-2 font-bold text-yellow-400 font-medium text-lg`}>
                Signup
                </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}