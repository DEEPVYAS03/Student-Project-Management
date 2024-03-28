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
import {useUser} from '../context/allContext';
import axios from 'axios';
import tw from 'twrnc';
import {set} from 'mongoose';

const Tab = createMaterialTopTabNavigator();

export default function TaskTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: {backgroundColor: '#3366ff'},
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
  const [tasks, setTasks] = useState([]);
  const [taskUser, setTaskUser] = useState({});

  const {userId} = useUser();

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${ipconstant}/api/get-all-friends/${userId}`,
      );
      console.log('Response:', response.data);
      const fetchedFriends = response.data.friends;
      const sameUser = await axios.get(`${ipconstant}/api/user/${userId}`);
      console.log('Same User:', sameUser.data);
      const currentUser = sameUser.data;
      const allUsers = [currentUser, ...fetchedFriends];

      setUsers(allUsers);

      console.log('Users:', allUsers);
    } catch (error) {
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
        assignedTo: selectedUsers.map(user => user.id),
      };

      console.log('Payload:', payload);

      // Send data to backend
      const response = await axios.post(`${ipconstant}/api/savetask`, payload);

      console.log('Task saved successfully:', response.data);

      // Close modal after saving
      setTaskId(taskId + 1);
      setModalVisible(false);
      fetchTasks();
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
    return item => {
      // Check if the selected item is already in the selectedUsers array
      const isSelected = selectedUsers.some(user => user.id === item.id);
      if (isSelected) {
        // If selected, remove it from the assignedTo array
        const updatedAssignedTo = assignedTo.filter(
          userId => userId !== item.id,
        );
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

  const onCompleteTask = async (taskId) => {
    try {
      // Send PUT request to mark task as completed
      await axios.put(`${ipconstant}/api/updatingtask`, {userId, taskId});
      // If successful, fetch tasks again to update UI
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${ipconstant}/api/showingTask/${userId}`,
      );
      console.log('Tasks:', response.data);
      setTaskUser(response.data.user);
      setTasks(response.data.assignedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // filters
  const tasksAssignedByMe = tasks.filter(task => task.assignedBy.id === userId && task.completed === false);
  const tasksAssignedByOthers = tasks.filter(
    task => task.assignedBy.id !== userId && task.completed === false
  );
  const completedTasks = tasks.filter(task => task.completed === true);

  return (
    <View style={{flex: 1}}>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: '80%',
              color: 'black',
            }}>
            <Text style={{color: 'black', fontSize: 18, marginBottom: 10}}>
              Task Details
            </Text>

            {/* TaskId */}
            <View>
              <Text style={{color: 'black'}}>TaskId:</Text>
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
              <Text style={{color: 'black'}}>Task Name:</Text>
              <TextInput
                style={{
                  marginBottom: 10,
                  borderColor: 'gray',
                  placeholderTextColor: 'gray',
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
              <Text style={{color: 'black'}}>Select Date:</Text>
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
                labelStyle={{color: 'black'}}
                options={users.map(user => ({item: user.name, id: user._id}))}
                selectedValues={selectedUsers}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
                arrowIconColor="#3366ff"
                searchIconColor="#3366ff"
                toggleIconColor="#3366ff"
                multiOptionsLabelStyle={{color: 'white'}}
                multiOptionContainerStyle={{backgroundColor: '#3366ff'}}
              />
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Actual screen */}

      <View style={tw`ml-4`}>
        {/* Welcome */}
        <View style={tw`mt-5 flex-row items-center`}>
          <Text style={tw`text-black text-lg font-semibold mt-1`}>
            Here are your assigned tasks,
          </Text>
          <Text style={tw`ml-1 font-extrabold text-xl text-black `}>
            {taskUser.name} !!
          </Text>
        </View>

        {/* Task assigned by me  */}
        <View style={tw`mt-5`}>
          <Text style={tw`text-black`}>Tasks Assigned by Me:</Text>
          <ScrollView style={tw`h-38 mt-3`}>
            {tasksAssignedByMe.map((task, index) => (
              <View key={index} style={tw`mt-2`}>
                <View
                  style={tw`bg-gray-200 p-2 rounded-md w-90 flex-row justify-between`}>
                  <View>
                    <Text style={tw`text-black`}>{task.taskName}</Text>
                    <Text style={tw`text-black`}>
                      Deadline: {task.deadline}
                    </Text>
                  </View>
                  <View>
                    {/* Button to mark task as completed */}
                    <TouchableOpacity
                      onPress={() => onCompleteTask(task.taskId)}>
                      <Text
                        style={tw`mt-2 bg-blue-600 p-3 rounded-full text-white`}>
                        Completed
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tasks assigned by others */}
        <View style={tw`mt-5`}>
          <Text style={tw`text-black`}>Tasks Assigned by Others:</Text>
          <ScrollView style={tw`h-38 mt-3`}>
            {tasksAssignedByOthers.map((task, index) => (
              <View key={index} style={tw`mt-2`}>
                <View
                  style={tw`bg-gray-200 p-2 rounded-md w-90 flex-row justify-between`}>
                  <View>
                    <Text style={tw`text-black`}>{task.taskName}</Text>
                    <Text style={tw`text-black`}>
                      Deadline: {task.deadline}
                    </Text>
                    <Text style={tw`text-black`}>
                      Assigned by: {task.assignedBy.name}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => onCompleteTask(task.taskId)}>
                      <Text
                        style={tw`mt-2 bg-blue-600 p-3 rounded-full text-white`}>
                        Completed
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* completed tasks */}
        <View style={tw`mt-5`}>
          <Text style={tw`text-black`}>Completed Tasks:</Text>
          <ScrollView style={tw`h-38 mt-3`}>
            {completedTasks.map((task, index) => (
              <View key={index} style={tw`mt-2`}>
                <View style={tw`bg-gray-200 p-2 rounded-md w-90`}>
                  <Text style={tw`text-black`}>{task.taskName}</Text>
                  <Text style={tw`text-black`}>Deadline: {task.deadline}</Text>
                  <Text style={tw`text-black`}>
                    Assigned by: {task.assignedBy.name}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Add task button */}
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: '#3366ff',
            borderRadius: 20,
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
