import React, { Component } from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import Panel from "./panel";
import Firebase from "../firebase/firebase-api";
import Expo from "expo";
import { FloatingAction } from "react-native-floating-action";
export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: props.navigation.state.params.id,
      game: null,
      readOnly: undefined
    };
  }

  componentDidMount() {
    Firebase.listenToGame(this.state.gameId, game => {
      console.log(game);

      this.setState({
        game,
        readOnly: game.deviceId !== Expo.Constants.deviceId || !game.live
      });
    });
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Live Action!`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });
  componentWillUnmount() {
    Firebase.unListenToGame(this.state.gameId);
  }

  homePlusPoint() {
    let score = this.state.game.home.score + 1;
    Firebase.updateGameScore(
      this.state.gameId,
      score,
      this.state.game.visitor.score
    );
  }

  homeMinusPoint() {
    let score = this.state.game.home.score - 1;
    Firebase.updateGameScore(
      this.state.gameId,
      score,
      this.state.game.visitor.score
    );
  }

  visitorPlusPoint() {
    let score = this.state.game.visitor.score + 1;
    Firebase.updateGameScore(
      this.state.gameId,
      this.state.game.home.score,
      score
    );
  }

  visitorMinusPoint() {
    let score = this.state.game.visitor.score - 1;
    Firebase.updateGameScore(
      this.state.gameId,
      this.state.game.home.score,
      score
    );
  }

  render() {
    if (!this.state.game) {
      return null;
    }

    const columnStyle = {
      flex: 0.33,
      flexDirection: "column",
      alignItems: "center"
    };

    const scoreButtonStyle = {
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      padding: 5,
      width: 25,
      borderRadius: 10
    };

    return (
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}
      >
        <Panel style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 0.4, alignItems: "center" }}>
            <Text style={{ textAlign: "center", color: "#fff", fontsize: 20 }}>
              {this.state.game.home.nick}
            </Text>
            <Image
              style={{
                width: 150,
                height: 150,
                resizeMode: "contain"
              }}
              source={
                this.state.game.home.picture
                  ? {
                      uri: `data:image/jpeg;base64,${
                        this.state.game.home.picture
                      }`
                    }
                  : require("../img/user.png")
              }
            />
            {!this.state.readOnly && (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={scoreButtonStyle}
                  onPress={() => this.homePlusPoint()}
                >
                  <Text style={{ textAlign: "center" }}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...scoreButtonStyle, marginLeft: 5 }}
                  onPress={() => this.homeMinusPoint()}
                >
                  <Text style={{ textAlign: "center" }}>-</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{ flex: 0.2 }}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 60,
                backgroundColor: "lime"
              }}
            >{`${this.state.game.home.score || "0"} - ${this.state.game.visitor
              .score || "0"}`}</Text>
          </View>
          <View
            style={{
              flex: 0.4,
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            {!this.state.readOnly && (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={scoreButtonStyle}
                  onPress={() => this.visitorPlusPoint()}
                >
                  <Text style={{ textAlign: "center" }}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...scoreButtonStyle, marginLeft: 5 }}
                  onPress={() => this.visitorMinusPoint()}
                >
                  <Text style={{ textAlign: "center" }}>-</Text>
                </TouchableOpacity>
              </View>
            )}
            <Image
              style={{
                width: 150,
                height: 150,
                resizeMode: "contain"
              }}
              source={
                this.state.game.visitor.picture
                  ? {
                      uri: `data:image/jpeg;base64,${
                        this.state.game.visitor.picture
                      }`
                    }
                  : require("../img/user.png")
              }
            />

            <Text style={{ textAlign: "center", color: "#fff", fontsize: 20 }}>
              {this.state.game.visitor.nick}
            </Text>
          </View>
        </Panel>
        {!this.state.readOnly && (
          <FloatingAction
            actions={[
              {
                text: "Finish game",
                icon: require("../../assets/tennis_player_icon.png"),
                name: "complete_game",
                position: 1
              }
            ]}
            onPressItem={name => {
              switch (name) {
                case "complete_game":
                  Firebase.gameOver(this.state.gameId);
                  this.props.navigation.goBack(null);
                  break;
                default:
                  break;
              }
            }}
          />
        )}
      </View>
    );
  }
}
