import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, Picker, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class SignUpScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            house: 'Red',
            password: '',
            errorMessage: '',
            avatar: null,
            avatarbase64: "",
            hasPermission: false
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
            this.setState({ hasPermission: status === 'granted' });
        } else {
            this.setState({ hasPermission: status === 'granted' });
        }
    }

    handlePickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });
        
        if (!result.cancelled) {
            this.setState({
                avatar: result.uri,
                avatarbase64: result.base64
            })
        } else {
            alert("You have not added any photos.");
        }
    };

    validateCredentials = () => {
        if (this.state.fullname === "" || this.state.email === "" ||  this.state.password === "") {
            alert("Please enter all credentials.");
        } else {
            this.handleSignUp();
        }
    }

    handleSignUp = () => {
        axios.post('http://157.245.205.223:8000/student', {
            StudentName: this.state.fullname,
            Email: this.state.email,
            HouseID: this.state.house,
            Password: this.state.password,
            Avatar: this.state.avatarbase64
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                alert("You have signed up successfully.");
                this.props.navigation.navigate("SignIn");
            } 
        })
        .catch(error => {
            console.log(error);
            if (error.response.status === 403) {
                this.setState({ errorMessage: "Email Address has been Used" });
            } else if (error.response.status === 400) {
                this.setState({ errorMessage: "Please make sure all fields are not empty"});
            }
        })
    };
    
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
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{ uri: this.state.avatar }} style={styles.avatar} />
                        <Ionicons name="ios-add" size={40} color="#FFF" style={{ marginTop: 6, marginLeft: 2}} /> 
                    </TouchableOpacity>
                </View>

                <View style={styles.errorMessage}>
                    <Text style={styles.error}>{this.state.errorMessage}</Text>
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
                        <Picker
                            selectedValue={this.state.house}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ house: itemValue })}
                        >
                            <Picker.Item label="Red" value="red" />
                            <Picker.Item label="Blue" value="blue" />
                            <Picker.Item label="Yellow" value="yellow" />
                            <Picker.Item label="Green" value="green" />
                        </Picker>
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
        marginTop: -30,
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
        marginBottom: 30,
        marginHorizontal: 30,
        marginTop: -45
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
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: '#E1E2E6',
        borderRadius: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        top: -50
    },
    error: {
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        color: 'red'
    }
});