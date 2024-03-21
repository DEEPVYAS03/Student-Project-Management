import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { p_projects, projects } from '../constants/p_projects'; // Import the projects array
import { skills } from '../constants/skills'; // Import the skills array
import Feather from 'react-native-vector-icons/Feather';
import { useUser } from '../context/allContext';
import { useNavigation } from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import tw from 'twrnc'
import ProgressBar from 'react-native-progress/Bar';

const ProfileScreen = () => {

  const navigation = useNavigation();

  const {name} = useUser();
  const {college} = useUser();
  const {selectedImage, setSelectedImage} = useUser();
  const {setPassword} = useUser();

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 300,
      maxWidth: 300,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };
  console.log(selectedImage);

  const renderProjects = () => {
    return p_projects.map(project => (
      <TouchableOpacity key={project.id} style={styles.projectContainer}>
        <Image source={project.image} style={styles.projectImage} />
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderSkills = () => {
    return (
      <View style={styles.skillsContainer}>
        {skills.map(skill => (
          <TouchableOpacity key={skill.id} style={styles.skillContainer}>
            <Text style={styles.skillName}>{skill.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleBack = () => {
    navigation.navigate('Home')
  }
  const handleLogout = () => {
    // Implement logout functionality here
    navigation.navigate('Login');
    

  };

  return (
    <>

    {/* header */}
    <View style={styles.header}>
      <TouchableOpacity style={styles.backbtn} onPress={handleBack}>
        <Feather name="arrow-left" size={24} color="black" style={{ marginLeft: 20 }} />
      </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    <ScrollView style={{ flex: 1 }}>

    {/* Photo */}
      <View style={{ flex: 1,flexDirection:'row' , justifyContent:'center',}}>
        <View style={{width:150 ,height:150 }}>
      <TouchableOpacity onPress={openImagePicker}>
        {
          selectedImage === null ? 
          <Image
          source={require('../assets/images/Profile/default_profile.jpg')}
          style={{ width: '100%', height: '100%', borderRadius: 150, marginTop: 3, resizeMode:'cover',aspectRatio:1}}
          />
          :
          <Image
          source={{uri:selectedImage}}
          style={{ width: 150, height: 150, borderRadius: 150,  marginTop: 3 }}
        />
         
        }
        
      </TouchableOpacity>
      </View>
      </View>
      
      <View style ={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10}}>
      <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold'}}>{name}</Text>
      <Text style={{ fontSize: 15, color: 'black' }}>{college}</Text>
      </View>

      {/* <View style={{ flex: 1,flexDirection:'row',justifyContent:'space-evenly',  }}>
        <TouchableOpacity> 
          <Text style={{ fontSize: 20, color: 'black', margin: 10 ,borderRadius:15, backgroundColor:'#f0c44d', padding:10}}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity> 
          <Text style={{ fontSize: 20, color: 'black', margin: 10 ,borderRadius:15, backgroundColor:'#f0c44d',padding:10}}>Add to team</Text>
        </TouchableOpacity>      
      </View> */}

      
      <View>
        <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold', margin: 10 }}>Skills</Text>
        {renderSkills()}
      </View>
      <View style={tw`p-4`}>
      <View>
        <Text style={tw`font-bold text-2xl text-gray-600`}>Dashboard</Text>
      </View>
        <View style={tw`flex-row justify-between mt-5`}>
          <View style={tw`bg-yellow-400 w-43 h-35 p-1 rounded-xl`}>
            <Text style={tw`text-lg font-bold text-gray-600 ml-2`}>Projects</Text>
            <View style={tw`mt-5 items-center`}>
            <Text style={tw`text-4xl font-bold text-gray-600`}>14</Text>
            </View>
          </View>
          <View style={tw`bg-yellow-400 w-43 h-35 p-1 rounded-xl`}>
            <Text style={tw`text-lg font-bold text-gray-600 ml-2`}>Tasks</Text>
            <View style={tw`mt-5 items-center`}>
            <Text style={tw`text-4xl font-bold text-gray-600`}>35</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={tw`font-bold text-2xl text-gray-600 mt-5`}>Progress</Text>
          <View style={tw`mt-5`}>
            <View style={tw`flex-row justify-between items-center`} >
              <View style={tw`flex-col`}>
                <Text style={tw`text-base font-bold text-gray-600`}>Design System</Text>
                <Text style={tw`text-xs text-gray-500`}>Due in 2 days · 3 tasks</Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <View style={tw`mr-1`}>
                <ProgressBar progress={0.85} width={140} color={'#BE90D4'} />
                </View>
                <Text style={tw`font-bold text-gray-600`}>85%</Text>
              </View>
            </View>  
            <View style={tw`flex-row justify-between items-center mt-5`} >
              <View style={tw`flex-col`}>
                <Text style={tw`text-base font-bold text-gray-600`}>Construction</Text>
                <Text style={tw`text-xs text-gray-500`}>Due soon · 7 tasks</Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <View style={tw`mr-1`}>
                <ProgressBar progress={0.40} width={140} color={'#BE90D4'} />
                </View>
                <Text style={tw`font-bold text-gray-600 `}>40%</Text>
              </View>
            </View>
            <View style={tw`flex-row justify-between items-center mt-5`} >
              <View style={tw`flex-col`}>
                <Text style={tw`text-base font-bold text-gray-600`}>Research Paper</Text>
                <Text style={tw`text-xs text-gray-500`}>Due in 10 days </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <View style={tw`mr-1`}>
                <ProgressBar progress={0.60} width={140} color={'#BE90D4'} />
                </View>
                <Text style={tw`font-bold text-gray-600 `}>60%</Text>
              </View>
            </View>
          </View>
          <View style={tw`mt-5`}>
            <Text style={tw`font-bold text-2xl text-gray-600`}>Upcoming Meetings</Text>
            <ScrollView horizontal={true} style={tw`mt-5`}>
              <View>
                <Image source={require('../assets/images/Projectmanagement/download.jpeg')} style={tw`w-50 h-35 rounded-xl mr-5`} />
                <Text style={tw`font-bold text-black mt-2 ml-1`}>Research Discussion</Text>
                <Text style={tw`text-xs text-gray-500 ml-1`}>10:00 AM</Text>
              </View>
              <View>
                <Image source={require('../assets/images/Projectmanagement/code.png')} style={tw`w-50 h-35 rounded-xl mr-5`} />
                <Text style={tw`font-bold text-black mt-2 ml-1`}>Coding Session</Text>
                <Text style={tw`text-xs text-gray-500 ml-1`}>1:00 PM</Text>
              </View>
            </ScrollView>
          </View>
        </View>
    </View>
    </ScrollView>
    </>
    
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({

  backbtn: {
    marginTop:3
  },


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:15,
   
    // // backgroundColor: 'white', // Change color as needed
    // elevation: 2, // For Android shadow
    // shadowColor: '#000', // For iOS shadow
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  logoutButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 15,
    backgroundColor: '#f0c44d', // Change color as needed
  },
  logoutButtonText: {
    color: '#fff', // Change color as needed
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  projectImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  projectDescription: {
    fontSize: 14,
    color: 'black',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  skillContainer: {
    backgroundColor: '#f0c44d',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 10,
  },
  skillName: {
    fontSize: 16,
    color: 'black',
  },
});