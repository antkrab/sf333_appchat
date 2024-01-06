import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import RootNavigator from "./src/navigation/RootNavigation.js";
import { useState } from 'react';
import UserContext from './src/context/UserContext.js';

export default function App() {
  const [username, setUsername] = useState("");
  return (
    <NavigationContainer>
      <StatusBar />
      <UserContext.Provider value={ { username, setUsername } }>
      <RootNavigator/>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5d2586',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
