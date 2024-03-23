import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PastTask from './PastTask';
import ipconstant from '../ipconstant/ipconstant';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import { useUser } from '../context/allContext';
import axios from 'axios';

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

const K_OPTIONS = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
];

function TaskScreen() {
  const [selectedTeams, setSelectedTeams] = useState([]);
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


  const handleSave = () => {
    console.log('Task:', title);
    console.log('Assigned To:', assignedTo);
    console.log('Deadline:', deadline.toISOString().split('T')[0]);
    setModalVisible(false);
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
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
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
                options={K_OPTIONS}
                selectedValues={selectedTeams}
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
