import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import AboutScreen from './src/screens/AboutScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgetPasswordScreen from "./src/screens/ForgetPasswordScreen";
import CameraScreen from "./src/screens/CameraScreen";
import { CameraRoll } from "react-native";

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
  Main: MainScreen,
  About: AboutScreen,
  Camera: {
      screen: CameraScreen,
      navigationOptions: {
          headerShown: false
      }
  }
}, {
  initialRouteName: 'Login'
});



const AppContainer = createAppContainer(AppStackNavigator);
