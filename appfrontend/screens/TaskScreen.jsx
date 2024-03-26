import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PastTask from './PastTask';
import ipconstant from '../ipconstant/ipconstant';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import { useUser } from '../context/allContext';
import axios from 'axios';
import tw from 'twrnc'

const Tab = createMaterialTopTabNavigator();

export default function TaskTabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      indicatorStyle: { backgroundColor: '#3366ff' }
    }}>
      <Tab.Screen name="Upcoming" component={TaskScreen} />
      <Tab.Screen name="Past due" component={PastTask} />
    </Tab.Navigator>
  );
}


function TaskScreen() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [assignedTo, setAssignedTo] = useState([]);
  const [taskId, setTaskId] = useState(1);
  const [users, setUsers] = useState([]);
  const {userId} =useUser()


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
     
     const response = await axios.get(`${ipconstant}/api/get-all-friends/${userId}`)
    console.log('Response:', response.data);
     const fetchedFriends = response.data.friends;
     const sameUser = await axios.get(`${ipconstant}/api/user/${userId}`)
     console.log('Same User:', sameUser.data);
      const currentUser = sameUser.data;
      const allUsers =[currentUser, ...fetchedFriends]
      

      setUsers(allUsers);

      console.log('Users:', allUsers);



    }
    catch (error) {
      console.error('Error:', error);
    }
  };


  const handleSave = async () => {
    try {
      // Construct payload
      const payload = {
        userId: userId,
        taskId: taskId,
        title: title,
        deadline: deadline.toISOString().split('T')[0],
        assignedTo: selectedUsers.map(user => user.id)
      };

      console.log('Payload:', payload);
  
      // Send data to backend
      const response = await axios.post(`${ipconstant}/api/savetask`, payload);
  
      console.log('Task saved successfully:', response.data);
      
      // Close modal after saving
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  

  

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onPickerChange = selectedDate => {
    if (selectedDate) {
      setDeadline(selectedDate);
      setShowDatePicker(false); // Close date picker instantly after selecting date
    }
  };


  function onMultiChange() {
    return (item) => {
      // Check if the selected item is already in the selectedUsers array
      const isSelected = selectedUsers.some(user => user.id === item.id);
      if (isSelected) {
        // If selected, remove it from the assignedTo array
        const updatedAssignedTo = assignedTo.filter(userId => userId !== item.id);
        setAssignedTo(updatedAssignedTo);
      } else {
        // If not selected, add it to the assignedTo array
        const updatedAssignedTo = [...assignedTo, item.id];
        setAssignedTo(updatedAssignedTo);
      }
  
      // Toggle selection in selectedUsers array
      const updatedSelectedUsers = isSelected
        ? selectedUsers.filter(user => user.id !== item.id)
        : [...selectedUsers, item];
      setSelectedUsers(updatedSelectedUsers);
    };
  }
  

  return (
    <View style={{ flex: 1 }}>


      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', color: 'black' }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>Task Details</Text>
  
            {/* TaskId */}
            <View>
              <Text style={{ color: 'black' }}>TaskId:</Text>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                style={{
                  marginBottom: 10,
                  borderColor: 'gray',
                  backgroundColor: '#d3d3d3',
                  placeholderTextColor: 'black',
                  borderWidth: 1,
                  padding: 10,
                  color: 'black',
                  borderRadius: 5,
                }}
                placeholder={taskId.toString()}
              />
            </View>
  
            {/* Task Name */}
            <View>
              <Text style={{ color: 'black' }}>Task Name:</Text>
              <TextInput
                style={{
                  marginBottom: 10,
                  borderColor: 'gray',
                  placeholderTextColor:'gray',
                  borderWidth: 1,
                  padding: 10,
                  color: 'black',
                  borderRadius: 5,
                }}
                placeholder="Task"
                value={title}
                onChangeText={text => setTitle(text)}
              />
            </View>
  
            {/* Date */}
            <View>
              <Text style={{ color: 'black' }}>Select Date:</Text>
              <TouchableOpacity onPress={openDatePicker}>
                <TextInput
                  style={{
                    marginBottom: 10,
                    color: 'black',
                    borderColor: 'gray',
                    placeholderTextColor: 'gray',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    height: 48,
                  }}
                  value={deadline.toISOString().split('T')[0]} // Format deadline as YYYY-MM-DD
                  placeholder="Deadline (YYYY-MM-DD)"
                  editable={false} // Make the input non-editable
                />
              </TouchableOpacity>
            </View>
  
            {showDatePicker && (
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                date={deadline} // Set selected date in the picker
                onConfirm={onPickerChange}
                onCancel={() => setShowDatePicker(false)}
              />
            )}
  
            {/* Assigned To */}
            <View>
              <SelectBox
                label="Assign To:"
                labelStyle={{ color: 'black' }}
                options={users.map(user => ({ item: user.name, id: user._id }))}
                selectedValues={selectedUsers}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
                arrowIconColor="#3366ff"
                searchIconColor="#3366ff"
                toggleIconColor="#3366ff"
                multiOptionsLabelStyle={{ color: 'white' }}
                multiOptionContainerStyle={{ backgroundColor: '#3366ff' }}
              />
            </View>
  
            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Save" onPress={handleSave} />
              <Button  title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
              
      {/* Actual screen */}

      <ScrollView style={tw`ml-4`}>
      {/* Welcome */}
      <View style={tw`mt-5 flex-row items-center`}>
              <Text style={tw`text-black text-lg font-semibold mt-1`}>Here are your assigned tasks,</Text>
              <Text style={tw`ml-1 font-extrabold text-xl text-black `}>Preksha!</Text>
      </View>

      <View style={tw`mt-3`}>
            <Text style={tw`text-black`}>Task assigned by Others:</Text>
      </View>

      </ScrollView>


      {/* Add task button */}
      <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: '#3366ff',
            borderRadius: 20,
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Add Task</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
  
}
