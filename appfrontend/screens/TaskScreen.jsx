import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PastTask from './PastTask';
import DropDownPicker from 'react-native-dropdown-picker';

const Tab = createMaterialTopTabNavigator();

export default function TaskTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Upcoming" component={TaskScreen} />
      <Tab.Screen name="Past due" component={PastTask} />
    </Tab.Navigator>
  );
}

function TaskScreen() {
  const items=[
    { label: 'User 1', value: 'user1' },
    { label: 'User 2', value: 'user2' },
    { label: 'User 3', value: 'user3' },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [assignedTo, setAssignedTo] = useState([]);
  const [taskId, setTaskId] = useState(1);

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Add Task</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
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
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>
              Task Details
            </Text>

            {/* TaskId */}
            <View>
              <Text>TaskId:</Text>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                style={{
                  marginBottom: 10,
                  borderColor: 'gray',
                  backgroundColor: '#d3d3d3',
                  borderWidth: 1,
                  padding: 10,
                  color: 'gray',
                  borderRadius: 5,
                }}
                placeholder={taskId.toString()}
              />
            </View>

            {/* Task Name */}
            <View>
              <Text>Task Name:</Text>
              <TextInput
                style={{
                  marginBottom: 10,
                  borderColor: 'gray',
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
              <Text>Select Date:</Text>
              <TouchableOpacity onPress={openDatePicker}>
                <TextInput
                  style={{
                    marginBottom: 10,
                    color: 'black',
                    borderColor: 'gray',
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
              <Text>Assign To:</Text>
              <DropDownPicker
                items={items}
                defaultValue='user1'
                multiple={true}
                min={0}
                max={3}
                placeholder="Select users"
                containerStyle={{ height: 40 }}
                onChangeItem={items => setAssignedTo(items.map(item => item.value))}
              />
            </View>

            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
