import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import AboutScreen from './src/screens/AboutScreen';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Main: {
    screen: MainScreen
  },
  About: {
    screen: AboutScreen
  }
}, {
    initialRouteName: "Main"
  }
);



const AppContainer = createAppContainer(AppStackNavigator);
