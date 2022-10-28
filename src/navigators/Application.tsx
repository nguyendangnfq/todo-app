import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './Main';
import { navigationRef } from './utils';
import { AddTask, EditTask } from '../containers';

const Stack = createStackNavigator();

function ApplicationNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen name="Add Task" component={AddTask} />
          <Stack.Screen name="Edit Task" component={EditTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default ApplicationNavigator;
