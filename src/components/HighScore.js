import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default class HighScore extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>High Scores</Text>
        <FlatList
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center" }}>No High Scores Yet!</Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginBottom: 15,
    marginTop: 50
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15
  }
});
