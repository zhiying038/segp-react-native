import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            name: "",
            email: "",
            password: "",
            sportHouse: "",
            confirmPassword: ""
        };
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../../assets/recycle.png")}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        returnKeyType="next"
                        onSubmitEditing={() => this.emailInput.focus()}
                    />
                    <TextInput
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        style={styles.input}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        returnKeyType="next"
                        ref={input => { this.emailInput = input }}
                        onSubmitEditing={() => this.passwordCInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Email"
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        ref={input => { this.passwordCInput = input }}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        returnKeyType="next"
                        secureTextEntry
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={password_confirmation => this.setState({ password_confirmation })}
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        returnKeyType="go"
                        ref={input => { this.passwordInput = input }}
                    />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.buttonText}>Have Account? Login Here</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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