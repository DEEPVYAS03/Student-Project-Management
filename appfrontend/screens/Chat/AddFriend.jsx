// export default AddFrien
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/allContext';
import ipconstant from '../../ipconstant/ipconstant';
import axios from 'axios';

const AddFriend = () => {
    const navigation = useNavigation();
    const { name, email, college, selectedImage ,userId,setUserId } = useUser();
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${ipconstant}/api/users`);
            if (!response.data) {
                console.log("error");
            }
            const data = response.data;
            const filteredUsers = data.filter((user) => user.email !== email);
            setFilteredUsers(filteredUsers);
        } catch (err) {
            console.log(err);
        }
    };

    const sendFriendRequest = async (receiverId) => {
      console.log('SendersId,ReceiversId :',userId,receiverId);
        try {
            const response = await axios.post(`${ipconstant}/api/send-friend-request`, { userId,receiverId });
            if (response.status === 200) {
                Alert.alert('Friend Request Sent', 'Your friend request has been sent successfully.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={tw`h-full relative`}>
            {/* Header*/}
            <View style={tw`mt-5 ml-2 flex flex-row  mr-5`}>
                <Feather
                    name="arrow-left"
                    size={24}
                    color="black"
                    onPress={() => navigation.navigate('ChatMain')}
                />
                <View style={tw`flex flex-row w-80 justify-center`}>
                    <Text style={tw`text-black text-center font-bold text-lg`}>Add People</Text>
                </View>
            </View>
            <View style={tw`mt-3`}></View>
            {/* Main chat screen Add friend */}
            {/* Box */}
            {filteredUsers.map((user) => (
                <View key={user._id} style={tw`mt-2 min-h-20 border-b border-gray-300 flex flex-row justify-between rounded-bl-lg rounded-br-lg bg-transparent shadow-md p-3`}>
                    {/* Icon */}
                    <View style={tw`h-20 flex flex-col justify-center`}>
                        <Image
                            style={tw`w-13 h-13 rounded-full`}
                            source={require('../../assets/images/Projectmanagement/user3.png')}
                        />
                    </View>
                    {/* Name Email */}
                    <View style={tw`mt-3`}>
                        <Text style={tw`text-black font-bold text-base`}>{user.name}</Text>
                        <Text style={tw`text-gray-500 text-sm`}>{user.email}</Text>
                    </View>
                    {/*  Add Friend Btn   */}
                    <View style={tw`flex flex-col justify-center`}>
                        <TouchableOpacity
                            style={tw`h-11 w-24 bg-yellow-400 shadow-lg  rounded-lg flex items-center justify-center`}
                            onPress={() => sendFriendRequest(user._id)}>
                            <Text style={tw`text-white font-bold text-sm`}>Send Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default AddFriend;