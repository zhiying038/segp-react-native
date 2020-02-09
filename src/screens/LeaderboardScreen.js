import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HighScore from '../components/HighScore';

export default class LeaderboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highScores: []
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <HighScore />
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
    }
})