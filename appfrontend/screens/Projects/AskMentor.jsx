import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking,Pressable } from 'react-native';
import tw from 'twrnc';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
const MentorCard = ({ mentor }) => {
  const handleLinkedIn = () => {
    Linking.openURL(mentor.linkedinUrl);
  };

  return (
    <View>
      <Pressable style={styles.cardContainer}>
        <Image source={mentor.imageUrl} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{mentor.name}</Text>
          <Text style={styles.post}>{mentor.post}</Text>

          <View style={{flexDirection:'row'}}>
          <Text style={styles.workExp}>{mentor.workExp}</Text>
          <TouchableOpacity onPress={handleLinkedIn} style={{marginLeft:15}}>
            <AntDesign name="linkedin-square" size={20} color="#4B77BE"  />
            {/* <Text style={styles.link}>LinkedIn Profile</Text> */}
          </TouchableOpacity>
          </View>
          
        </View>
      </Pressable>
    </View>
  );
};

const AskMentor = () => {
  const mentors = [
    {
      id: 1,
      imageUrl: require('../../assets/images/Projectmanagement/user1.png'),
      name: "Ekta Shah",
      post: "Data Analyst",
      workExp: "5+ years",
      linkedinUrl: "https://www.linkedin.com/in/ekta-shah30"
    },
    {
      id: 2,
      imageUrl: require('../../assets/images/Projectmanagement/user1.png'),
      name: "Lekhraj Varshney",
      post: "Software Development Engineer",
      workExp: "8 years",
      linkedinUrl: "https://www.linkedin.com/in/lekhrajvarshney/"
    },
    {
      id: 3,
      imageUrl: require('../../assets/images/Projectmanagement/user1.png'),
      name: "Vinaya Sawant",
      post: "Majors in ML & Professor",
      workExp: "10+ years",
      linkedinUrl: "https://www.linkedin.com/in/dr-mrs-vinaya-sawant-8a498416/"
    }
  ];

    const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('ProjectsList')
  }
  return (
    <View style={tw`flex-1 bg-white`}>
        <View style={tw`flex-row items-center`}>
        <TouchableOpacity style={{}} onPress={handleBack}>
        <Feather name="arrow-left" size={24} color="black" style={{ marginLeft: 20, marginTop:18 }} />
      </TouchableOpacity>
      <Text style={tw`text-center text-5 font-bold mt-5 text-black ml-25`}>Ask a Mentor</Text>
        </View>
    
    <View style={styles.container}>
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    width: '100%',
    height: 130,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  post: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  workExp: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default AskMentor;