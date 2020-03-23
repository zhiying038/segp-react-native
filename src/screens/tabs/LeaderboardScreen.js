import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default class LeaderboardScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Leaderboard</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});