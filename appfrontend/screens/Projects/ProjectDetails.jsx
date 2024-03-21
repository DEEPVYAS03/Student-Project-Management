import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DocumentPicker from 'react-native-document-picker'

const ProjectDetails = () => {
  const selectDoc=async() => {
          console.log('Document picker')
          try {
              console.log('Document picker')
              const doc = await DocumentPicker.pick(
              {
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: true,
              }
              );
              console.log(doc)
          } catch (err) {
              if (DocumentPicker.isCancel(e)) {
                  console.log(e)
              }
              else
              {
                  console.log(err)
              }
          }
          
      }
    return (
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={{backgroundColor:'yellow', width:150, padding:10,borderRadius:15}} 
        onPress={selectDoc}
        >
          <Text style={{color:'black'}}> Document picker </Text>
        </TouchableOpacity>
      </View>
    )
      
    
}

export default ProjectDetails


// const App = () => {

//     const selectDoc=async() => {
//       console.log('Document picker')
//       try {
//           console.log('Document picker')
//           const doc = await DocumentPicker.pick(
//           {
//             type: [DocumentPicker.types.allFiles],
//             allowMultiSelection: true,
//           }
//           );
//           console.log(doc)
//       } catch (err) {
//           if (DocumentPicker.isCancel(e)) {
//               console.log(e)
//           }
//           else
//           {
//               console.log(err)
//           }
//       }
      
//   }
// return (
//   <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
//     <TouchableOpacity style={{backgroundColor:'yellow', width:150, padding:10,borderRadius:15}} 
//     onPress={selectDoc}
//     >
//       <Text style={{color:'black'}}> Document picker </Text>
//     </TouchableOpacity>
//   </View>
// )
  
// }

// export default App
