import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, LayoutAnimation, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class SignInScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
        };
        this.storeToken = this.storeToken.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);
    }

    storeToken = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
    }

    validateCredentials = () => {
        if (this.state.email === "" || this.state.password === "") {
            alert("Please enter all credentials.");
        } else {
            this.handleSignIn();
        }
    }

    handleSignIn = () => {
        axios.post('http://157.245.205.223:8000/auth', {
            username: this.state.email,
            password: this.state.password
        })
        .then(response => { 
            this.storeToken('userToken', response.data.access_token);
            if (response.status >= 200 && response.status < 300) {
                this.storeToken('userToken', response.data.access_token);
                this.props.navigation.navigate('App');
            } 
        })
        .catch(error => {
            console.log(error);
            if (error.response) {
                if (error.response.status >= 400 && error.response.status < 500) {
                    this.setState({
                        errorMessage: "Invalid Credentials or You Do Not Have an Account."
                    });
                } 
            }
        })
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />

                <Image
                    source={require('../../../assets/authHeader.png')}
                    style={{ marginTop: -176, marginLeft: -50 }}
                />
                <Image
                    source={require('../../../assets/authFooter.png')}
                    style={{ position: 'absolute', bottom: -325, right: -225 }}
                />

                <Text style={styles.greeting}>{`Hello.\nWelcome.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.title}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={email => this.setState({ email: email })}
                            value={this.state.email}
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.title}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password: password })}
                            value={this.state.password}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.validateCredentials}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("SignUp")}
                >
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        No Account? <Text style={{ fontWeight: '500', color: '#E9446A' }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: -32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    form: {
        marginTop: 40,
        marginBottom: 48,
        marginHorizontal: 30
    },
    title: {
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
        justifyContent: 'center'
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    }
});