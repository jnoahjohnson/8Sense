import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import SenseContext, { SenseProvider } from "./src/context/SenseContext";
import SenseScreen from './src/screens/SenseScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StartScreen from './src/screens/StartScreen';

//UI Kitten
import { mapping, light } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { SimpleIconsPack } from './src/icons/simple-icons';

//My Themes
import { newDark as dark } from './src/themes/newDark';

const navigator = createStackNavigator({
  Home: HomeScreen,
  Sense: SenseScreen,
  Settings: SettingsScreen,
  Start: StartScreen
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: null,
  }
});

const AppContainer = createAppContainer(navigator);

const App = () => {

  useEffect(() => {
    console.log('here')
    return console.log('gone')
  }, [])

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AppContainer />
    </>
  )
}

export default () => {
  const themes = { light, dark };
  const [theme, setTheme] = useState('light');

  return (
    <SenseProvider>
      <IconRegistry icons={SimpleIconsPack} />
      <ApplicationProvider mapping={mapping} theme={dark}>
        <App />
      </ApplicationProvider>
    </SenseProvider>
  )
};