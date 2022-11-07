import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DoneTask, Home } from '../containers';
import { TaskDoneIcon, HomeIcon } from '../components/Icons';
import { theme } from '../theme/variables';
import { translate } from '../translations';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />;
          }
          if (route.name === 'Task Done') {
            return <TaskDoneIcon color={color} size={size} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: translate('home', '') }}
      />
      <Tab.Screen name="Task Done" component={DoneTask} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
