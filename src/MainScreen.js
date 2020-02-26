import React from 'react';
import {Platform, TouchableOpacity } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation';
import { Octicons, SimpleLineIcons, FontAwesome5 } from 'react-native-vector-icons';
import HomeScreen from './tabNavigators/HomeScreen';
import GameScreen from './tabNavigators/GameScreen';
import LeaderboardScreen from './tabNavigators/LeaderboardScreen';
import ProfileScreen from './tabNavigators/ProfileScreen';

export default class MainScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
                    <SimpleLineIcons name="camera" size={24} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
            ),
            title: "Recycle",
            headerRight: () => (
              <React.Fragment style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate("About")}>
                  <FontAwesome5 name="info-circle" size={20} style={{ paddingRight: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Octicons name="sign-out" size={20} style={{ paddingRight: 20}} />
                </TouchableOpacity>
              </React.Fragment>
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
      },
      Game: {
        screen: GameScreen,
        navigationOptions: {
          tabBarIcon: () => <FontAwesome5 name="gamepad" size={25} />
        }
      },
      Leaderboard: {
        screen: LeaderboardScreen,
        navigationOptions: {
          tabBarIcon: () => <FontAwesome5 name="chart-bar" size={25} />
        }
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: () => <FontAwesome5 name="user" size={25} />
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
