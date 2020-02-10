import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class RegisterScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.home}>This is RegisterScreen.</Text>
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