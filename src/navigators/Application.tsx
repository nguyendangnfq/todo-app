import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './Main';
import { navigationRef } from './utils';
import { AddTask, EditTask } from '../containers';
import { setI18nConfig } from '../translations';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';

const Stack = createStackNavigator();

function ApplicationNavigator() {
  const lang = useAppSelector((state: RootState) => state.language.currentLang);

  setI18nConfig(lang);
  return (
    <SafeAreaView style={{ flex: 1 }} key={lang}>
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
          <Stack.Screen name="AddTask" component={AddTask} />
          <Stack.Screen name="EditTask" component={EditTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default ApplicationNavigator;
