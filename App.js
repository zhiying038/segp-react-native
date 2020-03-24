import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

// Authentication Screens
import AuthLoadingScreen from './src/screens/auth/AuthLoadingScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import SignInScreen from './src/screens/auth/SignInScreen';

// App Tabs
import ProfileScreen from './src/screens/tabs/ProfileScreen';
import HomeScreen from './src/screens/tabs/HomeScreen';
import LeaderboardScreen from './src/screens/tabs/LeaderboardScreen';
// import GameScreen from './src/screens/tabs/GameScreen';

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
      }
    },
    // Game: {
    //   screen: GameScreen,
    //   navigationOptions: {
    //     tabBarIcon: ({ tintColor }) => <FontAwesome name="gamepad" size={24} color={tintColor} />
    //   }
    // },
    Leaderboard: {
      screen: LeaderboardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <AntDesign name="barschart" size={24} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
      }
    }
  }, 
  {
    tabBarOptions: {
      activeTintColor: '#161F3D',
      inactiveTintColor: '#B8BBC4',
      showLabel: false
    }
  }
)

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);