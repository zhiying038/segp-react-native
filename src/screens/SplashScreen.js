import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class SplashScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Recycling
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ade6e6'
    },
    text: {
        color: 'white',
        fontWeight: 40,
        fontSize: 60,
        fontWeight: 'bold'
    }
})