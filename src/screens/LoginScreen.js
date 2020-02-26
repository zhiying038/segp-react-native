import React from "react";
import { StyleSheet, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, Alert, AsyncStorage } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      studentId: "",
      password: "",
      checked: true
    };
    this.performLogin = this.performLogin.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin() {
    NetInfo.fetch().then(isConnected => {
      if (isConnected) {
        if (this.state.studentId === '' || this.state.password === '') {
          Alert.alert("Please enter all credentials.");
        } else {
          this.performLogin();
        }
      } else {
        Alert.alert("Please check your Internet connection.");
      }
    })
  }

  performLogin() {
    this.setState({isLoading: true});
    fetch('http://localhost:5000/student/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "studentId": this.state.studentId,
        "password": this.state.password
      })
    })
    .then(res => res.json())
    .then(resData => {
      console.log(resData);
      this.setState({ isLoading: false });
      if (resData.uid) {
        Alert.alert("Successfully Login!");
        AsyncStorage.setItem("userData", JSON.stringify(resData));
        this.props.navigation.navigate("Main");
      } else if (resData.message === "Invalid credentials. Try Again.") {
        Alert.alert("Incorrect Credentials");
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({isLoading: false});
      Alert.alert("Please check your Internet connection.");
    })
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
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            placeholder="Password"
            secureTextEntry
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Main")}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotPassword")}>
            <Text style={styles.buttonText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3098db"
  },
  logo: {
    width: 120,
    height: 120
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  formContainer: {
    padding: 20
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
  subtitle: {
  color: '#ffffff',
  width: 160,
  textAlign: 'center',
  fontSize: 35,
  fontWeight: 'bold',
  marginTop: 20
  },
});
