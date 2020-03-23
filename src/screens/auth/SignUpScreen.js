import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default class SignUpScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            house: '',
            password: '',
        };
    }

    handleSignUp = () => {
        axios.post('http://157.245.205.223:8000/student', {
            StudentName: this.state.fullname,
            Email: this.state.email,
            HouseID: this.state.house,
            Password: this.state.password
        })
        .then(response => {
            console.log(response);
            alert("You have signed up successfully.");
            this.props.navigation.navigate("SignIn");
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />

                <Image 
                    source={require('../../../assets/authHeader.png')} 
                    style={{ marginTop: -116, marginLeft: -50 }}
                />
                <Image 
                    source={require('../../../assets/authFooter.png')}
                    style={{ position: 'absolute', bottom: -325, right: -225 }}
                />

                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF" />
                </TouchableOpacity>

                <View style={{ position: 'absolute', top: 64, alignItems: 'center', width: '100%' }}>
                    <Text style={styles.greeting}>{`Hello!\nSign up to get started!`}</Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.title}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={name => this.setState({ fullname: name })}
                            value={this.state.name}
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.title}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email: email })}
                            value={this.state.email}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.title}>Sport House</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={house => this.setState({ house: house })}
                            value={this.state.house}
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

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                        <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ alignSelf: 'center', marginTop: 32 }} 
                    onPress={() => this.props.navigation.navigate("SignIn")}
                >
                    <Text style={{ color: '#414959', fontSize: 13 }}>
                        Already have an account? <Text style={{ fontWeight: '500', color: "#E9446A" }}>Sign In</Text>
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
        fontWeight: '400',
        textAlign: 'center'
    },
    back: {
        position: 'absolute',
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(21, 22, 48, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: -50
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
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    }
});