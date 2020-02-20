import React from 'react';
import {Platform, TouchableOpacity } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';

export default class MainScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("About")}>
                    <Icon name="info-circle" size={20} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
            ),
            title: "Recycling",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
                <Icon name="camera" size={20} style={{ paddingRight: 20 }} />
              </TouchableOpacity>
            )
        }
    }
    
    render() {
        const {navigate} = this.props.navigation;
        return (
            <AppContainer />
        );
    }
}

const AppNavigator = createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarIcon: () => <Icon name="home" size={25} />
        }
      },
      Game: {
        screen: GameScreen,
        navigationOptions: {
          tabBarIcon: () => <Icon name="gamepad" size={25} />
        }
      },
      Leaderboard: {
        screen: LeaderboardScreen,
        navigationOptions: {
          tabBarIcon: () => <Icon name="chart-bar" size={25} />
        }
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: () => <Icon name="user" size={25} />
        }
      }
    }, {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            },
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: false,
            showIcon: true
        }
    }
);

const AppContainer = createAppContainer(AppNavigator);
