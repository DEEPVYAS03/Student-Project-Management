import React from 'react'
import {View, Text} from 'react-native'
import AppNavigation from './navigation/AppNavigation';
import { UserProvider } from './context/allContext';
import {ModalPortal} from 'react-native-modals'

import { LogBox } from 'react-native';
const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <UserProvider>
      <AppNavigation />
      <ModalPortal/>
    </UserProvider>
  )
}
export default App