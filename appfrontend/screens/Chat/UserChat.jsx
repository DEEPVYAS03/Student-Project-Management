import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

const UserChat = ({item}) => {

    const navigation = useNavigation();

    console.log('Item:',item);
  return (
    
    console.log('Item:',item),
    <Pressable 
    onPress={() => navigation.navigate('Messages', {
        recepientId: item._id,
    })}
    style={{flexDirection:'row', alignItems:'center',
    gap:10,
    borderWidth:1,
    borderColor:'#D0D0D0',
    borderTopWidth:0,
    //borderBottomWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    padding:10
    }}>
      <Image style={{width:50,height:50,borderRadius:25,resizeMode:"cover"}} source={require('../../assets/images/Profile/default_profile.jpg')}/>
      <View style={{flex:1}}>
        <Text style={{fontSize:15,fontWeight:'bold', color:'black'}}>{item?.name}</Text>
        <Text style={{fontSize:13, color:'grey'}}>last message comes here</Text>

      </View>

      <View>
        <Text style={{fontSize:13, color:'grey', marginTop:1}}>
            12:00pm
        </Text>
      </View>
    </Pressable>
  )
}

export default UserChat
