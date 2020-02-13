import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HighScore from '../components/HighScore';

export default class LeaderboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highScores: [],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.leaderboard}>This is LeaderboardScreen.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    leaderboard: {
        textAlign: 'center'
    }
})