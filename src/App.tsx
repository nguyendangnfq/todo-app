import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ApplicationNavigator from './navigators/Application';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ApplicationNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}
