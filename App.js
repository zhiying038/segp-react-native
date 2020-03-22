import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons';

// Authentication Screens
import SignUpScreen from './src/screens/auth/SignUpScreen';
import SignInScreen from './src/screens/auth/SignInScreen';

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
);