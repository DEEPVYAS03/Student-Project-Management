import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import tw from "twrnc";
import Feather from "react-native-vector-icons/Feather";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { PROJECTS } from '../../constants/projects';
import ProjectDetails from './ProjectDetails';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ProjectsStack=()=> {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProjectsList" component={ProjectsScreen} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
    </Stack.Navigator>
  );
}


const ProjectsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);
  const navigation = useNavigation();
  const handlePress = (project) => {
    navigation.navigate('ProjectDetails', { project });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = PROJECTS.filter(project =>
      project.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
  };
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`justify-between flex-row`}>
        <Text style={tw` text-xl text-black mt-7 ml-5 font-bold `}>Projects</Text>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('AskMentor')
        }} style={tw`mt-5 mr-5 text-white bg-[#f0c44d] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
          <Text style={tw `text-white `} >Ask a Mentor</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row border bg-gray-100 rounded-2xl mx-3 mt-4 items-center`} >
        <Feather name="search" size={20} color="lightblue" style={tw`ml-4 mr-1`} />
        <TextInput
          style={tw`text-black w-4/5`}
          placeholder="Search projects"
          placeholderTextColor="lightblue"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {/* <View>
      <ScrollView horizontal={true}>
        <View style={tw`flex-row mb-2`}>
          <TouchableOpacity style={tw`border items-center justify-center bg-gray-100 ml-4 mt-4 p-2 rounded-3xl w-10 h-10`}>
            <Text style={tw`text-black`}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`border items-center justify-center bg-gray-100 ml-3 mt-4 p-2 rounded-3xl w-15 h-10`}>
            <Text style={tw`text-black`}>Web</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`border items-center justify-center bg-gray-100 ml-3 mt-4 p-2 rounded-3xl w-10 h-10`}>
            <Text style={tw`text-black`}>ML</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`border items-center justify-center bg-gray-100 ml-3 mt-4 p-2 rounded-3xl w-10 h-10`}>
            <Text style={tw`text-black`}>AI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`border items-center justify-center bg-gray-100 ml-3 mt-4 p-2 rounded-3xl w-25 h-10`}>
            <Text style={tw`text-black`}>Blockchain</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View> */}
      <ScrollView>
        <View>
          {filteredProjects.length === 0 ? (
            <Text style={tw`text-center mt-4 text-black`}>No projects found</Text>
          ) : (
            filteredProjects.map((project, index) => (
              <TouchableOpacity key={index} style={tw`border mt-4 mx-4 rounded-2xl p-4`} onPress={() => handlePress(project)}>
                <View style={tw`flex-row items-center`}>
                  <Image source={{ uri: project.image }} style={tw`rounded-lg w-15 h-15`} />
                  <View style={tw`ml-4`}>
                    <Text style={tw`font-bold text-lg text-black`}>{project.title}</Text>
                    <Text style={tw`text-gray-500`}>{project.status}</Text>
                    <Text style={tw`text-gray-500`}>{project.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default ProjectsStack