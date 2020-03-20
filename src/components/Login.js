import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, LayoutAnimation, StatusBar, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DeviceStorage from '../services/DeviceStorage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        const { email, password } = this.state;
        axios.post('http://localhost:5000/auth', {
            Email: email,
            Password: password
        })
        .then(response => {
            console.log(response);
            DeviceStorage.saveItem('id_token', response.data.jwt);
            this.props.newJWT(response.data.jwt);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Image source={require('../assets/authHeader.png')} style={{ marginTop: -176, marginLeft: -50 }} />
                <Image source={require('../assets/authFooter.png')} style={{ position: 'absolute', bottom: -325, right: -225 }} />

                <Text style={styles.greeting}>{`Hello.\nWelcome!`}</Text>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                    </View>

                    <View style={{ marginTop: 80 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.loginUser}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.authSwitch} style={{ alignSelf: 'center', marginTop: 32 }}>
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        No Account? <Text style={{ fontWeight: '500', color: '#E9446A' }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: -28,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: 40
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 110
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    }
})

export { Login };