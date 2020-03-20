import React, { Component } from 'react';
import { View, Text, Image, TextInput, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DeviceStorage from '../services/DeviceStorage';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            house: '',
            password: '',
            error: ''
        };
        this.registerUser - this.registerUser.bind(this);
    }

    registerUser() {
        const { name, email, house, password } = this.state;
        axios.post('http://localhost:5000/student', {
            Name: name,
            Email: email,
            HouseID: house,
            Password: password
        })
        .then(response => {
            console.log(response);
            DeviceStorage.saveItem('id_token', response.data.jwt);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Image source={require('../assets/authHeader.png')} style={{ marginTop: -116, marginLeft: -50 }} />
                <Image source={require('../assets/authFooter.png')} style={{ position: 'absolute', bottom: -325, right: -225}} />

                <View style={{ position: 'absolute', top: 64, alignItems: 'center', width: '100%' }}>
                    <Text style={styles.greeting}>{`Hello!\nSign up to get started!.`}</Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Sport House</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={house => this.setState({ house })}
                            value={this.state.house}
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.registerUser}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.authSwitch} style={{ alignSelf: 'center', marginTop: 32 }}>
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        Already have an account? <Text style={{ fontWeight: '500', color: '#E9446A' }}>Sign In</Text>
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
        marginTop: 32,
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: "#FFF"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: -95
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 320
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
})

export { Registration };