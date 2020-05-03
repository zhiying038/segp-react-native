import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Image,
} from "react-native";
import axios from "axios";

export default class Houses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: "",
    };
    // To retain object instance when function is passed
    this.housesData = this.housesData.bind(this);
  }

  // Instantiate the network request
  // Load data from the remote endpoint
  componentDidMount() {
    this.housesData();
  }

  // Invoke immediately after updating occurs
  componentDidUpdate() {
    this.housesData();
  }

  housesData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    axios
      .get("http://157.245.205.223:8000/leaderboards", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        this.setState({
          houses: data.Houses,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          styles.item,
          {
            backgroundColor:
              item.HouseName === "Red"
                ? "#FF0000"
                : item.HouseName === "Blue"
                ? "#85C1E9"
                : item.HouseName === "Yellow"
                ? "#F4D03F"
                : "#27AE60",
          },
        ]}
      >
        {/* Show the medal for the top three houses,
                    rest of the houses will display nothing */}
        <View style={styles.content}>
          <View>
            <Image
              source={
                index + 1 === 1
                  ? require("../../../assets/leaderboard/gold.png")
                  : index + 1 === 2
                  ? require("../../../assets/leaderboard/silver.png")
                  : index + 1 === 3
                  ? require("../../../assets/leaderboard/bronze.png")
                  : null
              }
              style={styles.medal}
            />
          </View>

          <Text style={styles.houseName}>{item.HouseName}</Text>

          <View style={styles.recycleContainer}>
            <View style={[styles.statsBox, { paddingRight: 10 }]}>
              <Image
                source={require("../../../assets/water.png")}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={{ fontSize: 24, textAlign: "center" }}>
                {item.BrownRecycled}
              </Text>
              <Text style={styles.subtext}>Glass Recycled</Text>
            </View>

            <View style={[styles.statsBox, styles.boxline]}>
              <Image
                source={require("../../../assets/paper_2.png")}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={{ fontSize: 24 }}>{item.BlueRecycled}</Text>
              <Text style={styles.subtext}>Paper Recycled</Text>
            </View>

            <View style={[styles.statsBox, { paddingLeft: 10 }]}>
              <Image
                source={require("../../../assets/drink.png")}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={{ fontSize: 24 }}>{item.OrangeRecycled}</Text>
              <Text style={styles.subtext}>Aluminium Recycled</Text>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Total Points:{" "}
              {item.OrangeRecycled + item.BlueRecycled + item.BrownRecycled}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  ItemSeparatorComponent = () => {
    return <View style={{ height: 10 }} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flatlist}>
          <FlatList
            // Destructure houses to unpack properties from objects
            // into distinct variables to sort the total number of recycled
            data={[...this.state.houses].sort((a, b) => {
              const aScore =
                a.BlueRecycled + a.BrownRecycled + a.OrangeRecycled;
              const bScore =
                b.BlueRecycled + b.BrownRecycled + b.OrangeRecycled;
              return bScore - aScore;
            })}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
            showsVerticalScrollIndicator={false}
            // Use id for react keys instead of the default key property
            keyExtractor={(item, index) => index.toString()}
            // Make sure the FlatList itself will re-render when the state changes
            extraData={this.state}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingBottom: 5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  houseName: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#FFF",
    textAlign: "center",
  },
  flatlist: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: "row",
    borderRadius: 10,
  },
  recycleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  subtext: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "500",
    textAlign: "center",
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  boxline: {
    borderColor: "#000",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingRight: 5,
    paddingLeft: 5,
  },
  image: {
    height: 50,
    width: 50,
  },
  medal: {
    width: 30,
    height: 30,
    position: "absolute",
  },
});
