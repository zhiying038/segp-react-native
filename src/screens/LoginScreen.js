import React from "react";
import { StyleSheet, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text } from "react-native";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      checked: true
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
    backgroundColor: "#3498db"
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
