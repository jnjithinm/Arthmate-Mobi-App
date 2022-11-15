/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from "react-native-flash-message";
import AppNavigator from "./src/routers/AppNavigator";
import { store, persistor } from './store';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      {/* <--- here as last component */}
      <FlashMessage position="top" />
    </View>
  );
};

export default App;