import React from "react";
import { StyleSheet, View,Text } from "react-native";

const ChatBubble = ({role,text}) => {
    return (
        <View style={[styles.chatItem,
        role==="user" ? styles.userChatItem : styles.modelChatItem,]}>
            <Text style={styles.chatText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    chatItem:{
        padding:7,
        marginBottom:12,
        borderRadius:20,
        maxWidth:"90%",
        position:"relative",
    },
    userChatItem:{
        backgroundColor:"#007AFF",
        alignSelf:"flex-end",
        borderTopRightRadius:0,
    },
    modelChatItem:{
        backgroundColor:"#007AFF",
        alignSelf:"flex-start",
        borderTopLeftRadius:0,
    },
    chatText:{
        fontSize:16,
        color:"#fff",
        padding:5,
    },
});

export default ChatBubble;