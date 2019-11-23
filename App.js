import React, { useContext, useState, useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import SenseContext, { SenseProvider } from "./src/context/SenseContext";
import SenseScreen from './src/screens/SenseScreen';
import SettingsScreen from './src/screens/SettingsScreen';

//UI Kitten
import { mapping, light } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';

//My Themes
import { newDark as dark } from './src/themes/newDark';

const navigator = createStackNavigator({
  Home: HomeScreen,
  Sense: SenseScreen,
  Settings: SettingsScreen
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: null,
  }
});

const AppContainer = createAppContainer(navigator);

const App = () => {


  return (
    <AppContainer />
  )
}

export default () => {
  const themes = { light, dark };
  const [theme, setTheme] = useState('light');

  return (
    <SenseProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={dark}>
        <App />
      </ApplicationProvider>
    </SenseProvider>
  )
};