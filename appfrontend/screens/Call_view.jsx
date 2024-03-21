import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  ZegoUIKitPrebuiltVideoConference from '@zegocloud/zego-uikit-prebuilt-video-conference-rn';


export default function Call_view({route}) {
    const navigation = useNavigation();
    const name = route.params.data
    console.log(name)
    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltVideoConference
                appID={1817869737}
                appSign={"f3ebf122df8c6f8fe7102d416ab29a9fb54c404dd6e99270aef3374d0d4649ad"}
                userID={"krish"} // userID can be something like a phone number or the user id on your own user system. 
                userName={"user_krish"}
                conferenceID={'TeamMeeting'} // callID can be any unique string. 

                config={{
                    
                    onLeave : () => { 
                        console.log('leaving')
                        navigation.navigate('Home') 
                    }

                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})