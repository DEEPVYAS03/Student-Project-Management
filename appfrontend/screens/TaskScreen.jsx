// import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import { tasks } from '../constants/tasks';
// import {
//   BottomModal,
//   ModalContent,
//   ModalTitle,
//   SlideAnimation,
// } from 'react-native-modals';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Antdesign from 'react-native-vector-icons/AntDesign';

// const TaskScreen = () => {
//   const suggestions = [
//     {
//       id: '0',
//       todo: 'Add file',
//     },
//     {
//       id: '1',
//       todo: 'Schedule meet',
//     },
//     {
//       id: '2',
//       todo: 'Contact mentor',
//     },
//     {
//       id: '3',
//       todo: 'Update Profile',
//     },
//     {
//       id: '4',
//       todo: 'Complete project',
//     },
//     {
//       id: '5',
//       todo: 'Submit assignment',
//     },
//   ];

//   const [todo, setTodo] = useState('');
//   const [isVisible, setIsVisible] = useState(false);
//   const [taskList, setTaskList] = useState(tasks);

//   const handleCheckCirclePress = (taskId) => {
//     setTaskList(prevTasks => prevTasks.filter(task => task.id !== taskId));
//   };

  

//   const handleSendIconPress = () => {
//     if (todo.trim() !== '') {
//       const newTask = {
//         id: Math.random().toString(),
//         todo: todo.trim(),
//       };
//       setTaskList(prevTasks => [...prevTasks, newTask]);
//       setTodo('');
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       <View style={{alignItems:'center'}}>
//         <Text style={{ marginLeft: 15, marginTop: 20, color: 'black', fontSize: 20 , fontWeight:'bold'}}>
//           My Tasks
//         </Text>
//       </View>
//       <ScrollView style={{ marginTop:10 }} horizontal={false}>
//         {taskList.map(task => (
//           <View key={task.id} style={{ flexDirection: 'row', justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 20 }}>
//             <Text style={{ color: 'black', fontSize: 15 }}>{task.todo}</Text>
//             <Pressable onPress={() => handleCheckCirclePress(task.id)}>
//               <Antdesign name="checkcircleo" size={20} style={{ color: 'black', marginLeft: 10 }} />
//             </Pressable>
//           </View>
//         ))}
//       </ScrollView>

//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'flex-end',
//           marginTop: 150,
//           alignItems: 'flex-end',
//         }}>
//         <Pressable
//           onPress={() => setIsVisible(!isVisible)}
//           style={{
//             borderRadius: 50,
//             marginBottom: 30,
//             marginRight: 25,
//           }}>
//           <Antdesign
//             name="pluscircle"
//             size={60}
//             style={{ position:'absolute' ,bottom:5,right:3,color: "#f0c44d" }}></Antdesign>
//         </Pressable>
//       </View>

//       <BottomModal
//         onBackdropPress={() => setIsVisible(!isVisible)}
//         onHardwareBackPress={() => setIsVisible(!isVisible)}
//         swipeDirection={['up', 'down']}
//         swipeThreshold={200}
//         modalTitle={
//           <ModalTitle
//             title="Add Task"
//             style={{ backgroundColor: 'white', color: 'white' }}
//           />
//         }
//         modalAnimation={
//           new SlideAnimation({
//             slidefrom: 'bottom',
//           })
//         }
//         visible={isVisible}
//         onTouchOutside={() => setIsVisible(!isVisible)}>
//         <ModalContent
//           style={{ width: '100%', height: 290, backgroundColor: 'white' }}>
//           <View style={{ flexDirection: 'row' }}>
//             <TextInput
//               value={todo}
//               onChangeText={text => setTodo(text)}
//               placeholder="Enter a task here"
//               style={{
//                 backgroundColor: 'gray',
//                 color: 'black',
//                 fontSize: 17,
//                 borderColor: 'black',
//                 borderWidth: 1,
//                 borderRadius: 25,
//                 padding: 10,
//                 marginTop: 15,
//                 width: '90%',
//               }}></TextInput>
//             <Ionicons
//               name="send-outline"
//               size={30}
//               color="black"
//               style={{ position: 'absolute', right: 1, top: 25 }}
//               onPress={handleSendIconPress}
//             />
//           </View>

//           <Text style={{ marginTop: 15, color: 'black' }}>Some suggestions</Text>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: 10,
//               flexWrap: 'wrap',
//               marginVertical: 10,
//             }}>
//             {suggestions?.map((item, index) => (
//               <TouchableOpacity
//                 onPress={() => setTodo(item?.todo)}
//                 style={{
//                   backgroundColor: "#f0c44d",
//                   paddingHorizontal: 10,
//                   paddingVertical: 8,
//                   borderRadius: 25,
//                 }}
//                 key={index}>
//                 <Text style={{ textAlign: 'center', color: 'black' }}>
//                   {item?.todo}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ModalContent>
//       </BottomModal>
//     </View>
//   )
// }

// export default TaskScreen;


import { Modal, View, Text, TextInput, TouchableOpacity,Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; 
import PastTask from './PastTask';

const Tab = createMaterialTopTabNavigator();


export default function TaskTabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Upcoming" component={TaskScreen} />
      <Tab.Screen name="Past due " component={PastTask} />
    </Tab.Navigator>
  )
}

function TaskScreen({ isVisible, onClose }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSave = () => {
    // Handle saving the task details here
    console.log('Task:', task);
    console.log('Deadline:', deadline);
    console.log('Assigned To:', assignedTo);

    // You can add further logic here, like sending the data to a server, etc.
    
    // Close the modal after saving
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Add Task</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Task Details</Text>
            <TextInput
              style={{ marginBottom: 10, borderColor: 'gray', borderWidth: 1, padding: 10 }}
              placeholder="Task"
              value={task}
              onChangeText={text => setTask(text)}
            />
            <TextInput
              style={{ marginBottom: 10, borderColor: 'gray', borderWidth: 1, padding: 10 }}
              placeholder="Deadline (YYYY-MM-DD)"
              value={deadline}
              onChangeText={text => setDeadline(text)}
            />
            <TextInput
              style={{ marginBottom: 10, borderColor: 'gray', borderWidth: 1, padding: 10 }}
              placeholder="Assigned To"
              value={assignedTo}
              onChangeText={text => setAssignedTo(text)}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );

}

