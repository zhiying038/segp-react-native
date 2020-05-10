/* 
Code written by group 7A

Libraries are:
- react-naive-scrollable-tab-view
*/

import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Text } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Houses from '../../components/leaderboard/Houses';
import Student from '../../components/leaderboard/Student';

const width = Dimensions.get('screen').width;

export default class LeaderboardScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground
                        source={require('../../../assets/homeHeader.png')}
                        style={styles.ImageBackground}
                        resizeMode="contain"
                    >
                        <Text style={styles.title}>LEADERBOARD</Text>
                    </ImageBackground>
                </View>

                <View style={styles.tabbar}>
                    <ScrollableTabView
                        style={{ marginTop: 5 }}
                        initialPage={0}
                        tabBarActiveTextColor="green"
                        renderTabBar={() => <DefaultTabBar underlineStyle={{ backgroundColor: 'green' }} />}
                    >
                        <Houses tabLabel="Houses" props={this.props} />
                        <Student tabLabel="Student (Top 10)" prop={this.props} />
                    </ScrollableTabView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        marginTop: -15,
        position: 'absolute'
    },
    tabbar: {
        flex: 1,
        marginTop: width * 0.3,
        paddingEnd: 1,
        paddingStart: 1
    },
    ImageBackground: {
        width: width * 0.4,
        height: width * 0.4,
        alignItems: 'center'
    },
    title: {
        color: '#FFF',
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 20,
    }
})