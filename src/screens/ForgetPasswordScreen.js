import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, NetInfo, Alert} from 'react-native';

export default class ForgetPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: ''
        };
        this.submit = this.submit.bind(this);
        this.previousScreen = this.previousScreen.bind(this);
    }

    submit() {
        if (this.state.email === '') {
            Alert.alert('Please enter your email address.');
            return;
        }
        if (!this.state.email.includes("@")) {
            Alert.alert("Invalid Email");
            return;
        }
        // NetInfo.isConnected.fetch().then(isConnected => {
        //     if (isConnected) {
        //         this.setState({loading: true});
        //         fetch('http://localhost:8000/forgot-password', {
        //             method: "POST",
        //             headers: {
        //                 "Accept": "application/json",
        //                 "Content-type": "application/json"
        //             },
        //             body: JSON.stringify({
        //                 "email": this.state.email
        //             })
        //         })
        //         .then(res => res.json())
        //         .then(resData => {
        //             console.log(JSON.stringify(resData));
        //             if (resData.message === "Password Reset Email Sent!") {
        //                 this.setState({isLoading: false});
        //                 Alert.alert("Password reset link sent to your email.");
        //             } else {
        //                 this.setState({isLoading: false});
        //                 Alert.alert("Invalid email.");
        //             }
        //         })
        //         .catch(err => {
        //             Alert.alert("Please check your internet connection.");
        //         });
        //     } else {
        //         Alert.alert("The app requires Internet connection.");
        //     }
        // })
    }

    previousScreen() {
        this.props.navigation.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    underlineColorAndroid="transparent"
                    returnKeyType="go"
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.submit()}>
                    <Text style={styles.buttonText}>Forgot Password</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1.2,
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 100,
        backgroundColor: "#3498db"
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#fff',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginBottom: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    },
})