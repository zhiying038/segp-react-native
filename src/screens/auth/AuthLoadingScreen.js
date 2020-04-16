import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, Image, Text } from 'react-native';

export default class AuthLoadingScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.bootstrapAsync()
        }, 2000)
    }

    bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="default" />
                <Image
                    source={require('../../../assets/logo.png')}
                    style={{ height: 100, width: 100 }}
                />
                <Text style={styles.name}>Recycle</Text>
                <ActivityIndicator size='large' style={{ marginTop: 10 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'green'
    }
});