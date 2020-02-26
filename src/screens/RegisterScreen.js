import React from "react";
import {StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity, Picker} from "react-native";
import axios from 'axios';

const serverUrl = "http://127.0.0.1:5000";
const http = axios.create({
  baseURL: serverUrl
});

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      studentId: "",
      email: "",
      sportHouse: "",
      password: "",
      confirmPassword: "",
      isLoading: false
    }
    this.onRegister = this.onRegister.bind(this);
    this.performRegister = this.performRegister.bind(this);
  }

  onRegister(name, studentId, email, sportHouse, password) {
    console.log(email);
    console.log(studentId);
    console.log(name);
    console.log(sportHouse);
    console.log(password);

    this.setState({ isLoading: true });
    http.post('/student', {
      "StudentName": name,
      "StudentID": studentId,
      "Email": email,
      "HouseID": sportHouse,
      "Password": password
    })
    .then(response => {
      response.json();
      this.setState({ isLoading: false });
      Alert.alert("You have registered successfully!");
      this.props.navigation.navigate("Login");
    })
    .catch(error => {
      console.log(error);
      this.setState({ isLoading: false });
    })
  }

  performRegister() {
      this.onRegister(this.state.name, this.state.studentId, this.state.email, this.state.password,
      this.state.sportHouse);
  };

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
            onChangeText={text => this.setState({name: text})}
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
          <TextInput
            onChangeText={id => this.setState({studentId: id})}
            placeholder="Student ID"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            keyboardType='number-pad'
            style={styles.input}
          />
          <TextInput
            onChangeText={text => this.setState({email: text})}
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            ref={input => {
              this.emailInput = input;
            }}
            onSubmitEditing={() => this.passwordCInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
          />
          <TextInput
            onChangeText={text => this.setState({sportHouse: text})}
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            ref={input => {
              this.houseInput = input;
            }}
            autoCorrect={false}
            placeholder="Sport House"
          />
          <TextInput
            onChangeText={text => this.setState({password: text})}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            ref={input => {
              this.passwordCInput = input;
            }}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            onChangeText={text =>
              this.setState({confirmPassword: text})
            }
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            ref={input => {
              this.passwordInput = input;
            }}
          />
          <TouchableOpacity
            onPress={onPress=() => this.performRegister()}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Have Account? Login Here</Text>
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
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 10,
    color: "#fff",
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 15,
    marginBottom: 5
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "700"
  },
  subtitle: {
    color: "#ffffff",
    width: 160,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 20
  }
});
