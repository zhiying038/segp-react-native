import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class GameScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.home}>This is GameScreen.</Text>
                </View>
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
    home: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
})