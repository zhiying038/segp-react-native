import React from "react";
import {StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity} from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: "",
      studentId: "",
      email: "",
      password: "",
      sportHouse: "",
      confirmPassword: ""
    };
  }

  performRegister() {
    NetInfo.fetch().then(isConnected => {
      if (isConnected) {
        if (
          this.state.name === "" ||
          this.state.studentId === "" ||
          this.state.email === "" ||
          this.state.password === "" ||
          this.state.confirmPassword === "" ||
          this.state.sportHouse === ""
        ) {
          Alert.alert("Please enter all credentials.");
        } else if (this.state.password !== this.state.confirmPassword) {
          Alert.alert("Password does not match.");
        } else {
          this.submitRegister(
            this.state.name,
            this.state.studentId,
            this.state.email,
            this.state.password,
            this.state.sportHouse
          );
        }
      } else {
          Alert.alert("The app requires Internet connection.");
      }
    });
  }

  submitRegister(name, studId, email, password, sport_house) {
    this.setState({isLoading: true});
    fetch("http://localhost:5000", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": name,
            "studentId": studId,
            "email": email,
            "password": password,
            "sportHouse": sport_house
        })
    })
    .then(res => res.json())
    .then(resData => {
        console.log(JSON.stringify(resData));
        this.setState({isLoading: false});
        if (resData.message === "Successfully Registered") {
            Alert.alert("Registered Successfully");
            this.props.navigation.navigate("Login");
        } else {
            Alert.alert("Something is wrong");
        }
    })
    .catch(err => {
        console.log(err);
        Alert.alert("Please check your Internet connection.");
        this.setState({isLoading: false});
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
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
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
            value={this.state.password}
            onChangeText={password_confirmation =>
              this.setState({ password_confirmation })
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
            onPress={() => this.props.navigation.navigate("Main")}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
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
