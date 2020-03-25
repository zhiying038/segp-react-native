import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, ImageBackground, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export default class LeaderboardScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground
                        source={require('../../../assets/homeHeader.png')}
                        style={styles.background}
                        resizeMode="contain"
                    >
                        <Text style={styles.title}>LEADERBOARD</Text>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        marginTop: 15.5,
        position: 'absolute'
    },
    background: {
        width: width * 0.4,
        height: width * 0.4,
        alignItems: 'center'
    },
    title: {
        color: '#FFF',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 5
    },
});