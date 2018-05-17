import React, { Component } from 'react';
import { View, Text, Button,  } from 'react-native';
import Firebase from '../firebase/firebase-api';
import GameList from "./game-list";
import { FloatingAction } from "react-native-floating-action";
class GamesScreen extends Component {
  constructor(props) {
		super(props);
		
		this.state = {
      players: [],
      liveGames: [],
      historicGames: []
		};
  }
  static navigationOptions = ({ navigation }) => ({
    title: `FireBoard`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });
  componentDidMount() {
    Firebase.listenToPlayers(p => this.setState({ players: p }));
    Firebase.listenToGames(g => {
      this.onGetGamesSuccess(g)});
  }

  componentWillUnmount() {
    Firebase.unlistenToGames();
    Firebase.unlistenToPlayers();
  }

  onGetGamesSuccess(games) {
    const liveGames = games.filter(g => g.live);
    const historicGames = games.filter(g => !g.live);

    this.setState({
      liveGames,
      historicGames
    })
  }

  onOpenGame(game) {
    console.log('open game', game);
  }

  render() {
    const actions = [
      {
        text: "New game",
        icon: require("../../assets/tennis_player_icon.png"),
        name: "new_game",
        position: 1
      }
    ];
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <GameList navigation={this.props.navigation} games={this.state.liveGames}title={"Live action"} onOpenGame={this.onOpenGame.bind(this)} />
        <GameList games={this.state.historicGames} showActions={false} title={"Old news"} onOpenGame={this.onOpenGame.bind(this)} />
        <FloatingAction
            actions={actions}
            onPressItem={name => {
              switch (name) {
                case "new_game":
                  this.props.navigation.navigate("CreateGame", {
                    title: "New game"
                  });
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

export default GamesScreen;
