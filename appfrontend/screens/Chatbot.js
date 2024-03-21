import { View, Text, FlatList, StyleSheet, ActivityIndicator,TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';
import ChatBubble from './ChatBubble';

const Chatbot=()=>{
    const [chat,setChat]=useState([]);
    const [userInput,setUserInput]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    const API_KEY="AIzaSyBEuoRbAfGYAK7XpnyvfFv9890L0MvkwEw";

    const handleUserInput= async ()=>{
        let updatedChat=[
            ...chat,
            {
                role:"user",
                parts: [{text:userInput}],
            },
        ];
        setLoading(true);
        try{
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,{
              contents:updatedChat,
            }
        );
        console.log("Gemini response: ",response.data);
        const modelResponse=response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (modelResponse){
          const updatedChatwithModel=[
            ...updatedChat,
            {
              role:"model",
              parts:[{text:modelResponse}],
            },
          ];
          setChat(updatedChatwithModel);
          setUserInput("");
        }
    } catch (error){
      console.log("Error calling gemini Pro Api: ",error);
      console.log("Error response: ",error.response);
      setError("An error occurred while calling the model");
    } finally{
      setLoading(false);
    }
};
    const renderChatItem=({item})=>(
      <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      />
    );
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chatbot</Text>
        <FlatList data={chat} renderItem={renderChatItem} keyExtractor={(item,index)=>index.toString()} contentContainerStyle={styles.chatContainer}/>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={userInput} onChangeText={setUserInput} placeholder="Type your message" placeholderTextColor='#aaa'/>
          <TouchableOpacity style={styles.sendButton} onPress={handleUserInput}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator style={styles.loading} color="#333" />}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding:10
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input:{
    flex: 1,
    borderColor: '#333',
    borderWidth:1,
    borderRadius: 25,
    color: '#333',
    backgroundColor: '#fff',
    padding: 16,
    height: 50,
    marginRight: 10,
  },
  sendButton:{
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 25,
  },
  sendButtonText:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loading:{
    marginTop: 10,
  },
  error:{
    color: 'red',
    marginTop: 10,
  },
});

export default Chatbot;