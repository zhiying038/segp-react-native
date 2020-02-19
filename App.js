import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import AboutScreen from './src/screens/AboutScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgetPasswordScreen from "./src/screens/ForgetPasswordScreen";
<<<<<<< HEAD
import CameraScreen from "./src/screens/CameraScreen";
import { CameraRoll } from "react-native";
=======
>>>>>>> 594c0c2a8be8d0ce64a7d1e7dc3f4a26e351914b

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      headerShown: false
    }
  },
<<<<<<< HEAD
  Main: MainScreen,
  About: AboutScreen,
  Camera: {
      screen: CameraScreen,
      navigationOptions: {
          headerShown: false
      }
=======
  Main: {
    screen: MainScreen
  },
  About: {
    screen: AboutScreen,
>>>>>>> 594c0c2a8be8d0ce64a7d1e7dc3f4a26e351914b
  }
}, {
  initialRouteName: 'Login'
});



const AppContainer = createAppContainer(AppStackNavigator);
