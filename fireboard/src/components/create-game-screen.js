import React, { Component } from "react";
import Panel from "../components/panel";
import PlayerSelector from "./player-selector";
import { ActivityIndicator } from "react-native";
import { View, Text } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Firebase from "../firebase/firebase-api";
import Expo from "expo";
import moment from "moment";

export default class CreateGameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
      players: []
    };
  }

  componentDidMount() {
    Firebase.listenToPlayers(players => {
      this.setState({ players });
    });
  }

  componentWillUnmount() {
    Firebase.unListenToPlayers();
  }

  static navigationOptions = ({ navigation }) => ({
    title: `New Game`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  onPlayerSelected(id, isPlayerOne) {
    const player = this.state.players.filter(p => p.id === id);
    if (isPlayerOne) {
      this.setState({
        playerOne: (player && player[0]) || null
      });
    } else {
      this.setState({
        playerTwo: (player[0] && player[0]) || null
      });
    }
  }

  render() {
    const actions = [
      {
        text: "Add player",
        icon: require("../../assets/user_plus_icon.png"),
        name: "add_player",
        position: 1,
        color: "green"
      },
      {
        text: "Start game",
        icon: require("../../assets/check_icon.png"),
        name: "start_game",
        position: 2
      }
    ];

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {this.state.players &&
          this.state.players.length > 0 && (
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <PlayerSelector
                isPlayerOne={true}
                players={this.state.players}
                onPlayerSelected={this.onPlayerSelected.bind(this)}
                selectedPlayer={this.state.playerOne}
              />
              {(this.state.playerOne && this.state.playerTwo) && <Text style={{textAlign:'center', fontSize:40}}>vs</Text>}
              <PlayerSelector
                isPlayerOne={false}
                players={this.state.players}
                onPlayerSelected={this.onPlayerSelected.bind(this)}
                selectedPlayer={this.state.playerTwo}
              />
            </View>
          )}

        <FloatingAction
          actions={actions}
          onPressItem={name => {
            switch (name) {
              case "add_player":
                this.props.navigation.navigate("AddPlayer", {
                  title: "Add new player"
                });
                break;
              case "start_game":
                if (
                  !this.state.playerOne ||
                  !this.state.playerTwo ||
                  this.state.playerOne.id === this.state.playerTwo.id
                ) {
                  return;
                }

                Firebase.newGame(
                  this.state.playerOne,
                  this.state.playerTwo,
                  moment().format("YYYY-MM-DD"),
                  Expo.Constants.deviceId
                );

                this.props.navigation.navigate("Games");
                break;
              default:
                break;
            }
          }}
        />
      </View>
    );
  }
}
