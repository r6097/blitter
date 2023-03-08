import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files

import IntroScreen from './screens/IntroScreen';
import DashboardScreen from './screens/DashboardScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import MembersJoinScreen from './screens/MembersJoinScreen';
import ScanScreen from './screens/ScanScreen';
import ReviewItemsScreen from './screens/ReviewItemsScreen';
import AssignItemsScreen from './screens/AssignItemsScreen';
import TransactionCompleteScreen from './screens/TransactionCompleteScreen';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as MediaLibrary from "expo-media-library";


export default function App() {
  const Stack = createNativeStackNavigator();
  
  React.useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
    })
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Intro" 
          component={IntroScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{title: 'Blitter'}}
        />

        <Stack.Screen 
          name="CreateGroup" 
          component={CreateGroupScreen} 
        />
        <Stack.Screen 
          name="MembersJoin" 
          component={MembersJoinScreen} 
        />

        <Stack.Screen
          name="Scan"
          component={ScanScreen}
        />
        
        <Stack.Screen 
          name="ReviewItems" 
          component={ReviewItemsScreen} 
        />

        <Stack.Screen 
          name="AssignItems" 
          component={AssignItemsScreen} 
        />

        <Stack.Screen 
          name="TransactionComplete" 
          component={TransactionCompleteScreen} 
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}