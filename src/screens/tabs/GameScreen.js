/* 
Code written by group 7A

Libraries are:
- expo-av
- react-native-game-engine
*/

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  StatusBar,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Audio } from "expo-av";
import { GameEngine } from "react-native-game-engine";
import { GameLoop } from "../../components/snake/GameLoop";
import Constants from "../../components/snake/Constants";
import Head from "../../components/snake/Head";
import Food from "../../components/snake/Food";
import Tail from "../../components/snake/Tail";

const width = Dimensions.get("screen").width;

/**
 *
 *
 * @export
 * @class Snake
 * @extends {Component}
 */
export default class Snake extends Component {
  constructor(props) {
    super(props);
    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    this.state = {
      running: true,
      score: 0,
    };
    this.increaseScore = this.increaseScore.bind(this);
  }

  onEvent = (e) => {
    if (e.type === "game-over") {
      this.gameOver();
      alert("Game Over");
      this.setState({
        running: false,
      });
    } else if (e.type === "increase-score") {
      this.increaseScore();
    } else if (e.type === "play-music") {
      this.playScore();
    }
  };

  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  reset = () => {
    this.engine.swap({
      head: {
        position: [0, 0],
        xspeed: 1,
        yspeed: 0,
        updateFrequency: 10,
        nextMove: 10,
        size: Constants.CELL_SIZE,
        renderer: <Head />,
      },
      food: {
        position: [
          this.randomBetween(0, Constants.GRID_SIZE - 1),
          this.randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        renderer: <Food />,
      },
      tail: { size: Constants.CELL_SIZE, elements: [], renderer: <Tail /> },
    });
    this.setState({
      running: true,
      score: 0,
    });
  };

  increaseScore = () => {
    this.setState({
      score: this.state.score + 1,
    });
  };

  gameOver = async () => {
    await Audio.setIsEnabledAsync(true);
    const sound = new Audio.Sound();
    await sound.loadAsync(
      require("../../components/snake/sounds/game-over.mp3")
    );
    await sound.playAsync();
  };

  playScore = async () => {
    await Audio.setIsEnabledAsync(true);
    const sound = new Audio.Sound();
    await sound.loadAsync(require("../../components/snake/sounds/score.mp3"));
    await sound.playAsync();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../../../assets/homeHeader.png")}
            style={styles.imageBackground}
            resizeMode="contain"
          >
            <Text style={styles.title}>GAME</Text>
          </ImageBackground>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.score}>Score: {this.state.score}</Text>
        </View>

        <GameEngine
          ref={(ref) => {
            this.engine = ref;
          }}
          style={{
            width: this.boardSize,
            height: this.boardSize,
            flex: null,
            backgroundColor: "#a2c359",
            marginBottom: 10,
          }}
          systems={[GameLoop]}
          entities={{
            head: {
              position: [0, 0],
              xspeed: 1,
              yspeed: 0,
              updateFrequency: 10,
              nextMove: 10,
              size: Constants.CELL_SIZE,
              renderer: <Head />,
            },
            food: {
              position: [
                this.randomBetween(0, Constants.GRID_SIZE - 1),
                this.randomBetween(0, Constants.GRID_SIZE - 1),
              ],
              size: Constants.CELL_SIZE,
              renderer: <Food />,
            },
            tail: {
              size: Constants.CELL_SIZE,
              elements: [],
              renderer: <Tail />,
            },
          }}
          onEvent={this.onEvent}
          running={this.state.running}
        >
          <StatusBar hidden={true} />
        </GameEngine>

        <Button title="New Game" onPress={this.reset} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    margin: 25,
  },
  score: {
    fontSize: 20,
  },
  imageBackground: {
    width: width * 0.4,
    height: width * 0.4,
    alignItems: "center",
    marginTop: -115,
    marginLeft: -180,
  },
  title: {
    color: "#FFF",
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
});
