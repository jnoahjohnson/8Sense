import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import { SenseProvider } from "./src/context/SenseContext";
import SenseScreen from './src/screens/SenseScreen';
import SettingsScreen from './src/screens/SettingsScreen';

//UI Kitten
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';

//My Themes
import { newDark } from './src/themes/newDark';

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

const App = createAppContainer(navigator);

export default () => {
  return (
    <SenseProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={newDark}>

        <App />
      </ApplicationProvider>
    </SenseProvider>
  )
};