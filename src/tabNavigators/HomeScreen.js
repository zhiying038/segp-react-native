import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from 'react-native-vector-icons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <AntDesign name="home" style={{color: tintColor}} size={30} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
