import React, { Component } from 'react';
import { View, Text, Button,  } from 'react-native';
import Firebase from '../firebase/firebase-api';
import GameList from "./game-list";

class GamesScreen extends Component {
  constructor(props) {
		super(props);
		
		this.state = {
      players: [],
      liveGames: [],
      historicGames: []
		};
  }
  
  componentDidMount() {
    Firebase.listenToPlayers(p => this.setState({ players: p }));
    Firebase.listenToGames(g => this.onGetGamesSuccess(g));
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
    this.props.navigation.navigate("Game", { id: game.id });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <GameList navigation={this.props.navigation} games={this.state.liveGames} showActions={true} title={"Live action"} onOpenGame={this.onOpenGame.bind(this)} />
        <GameList navigation={this.props.navigation} games={this.state.historicGames} showActions={false} title={"Old news"} onOpenGame={this.onOpenGame.bind(this)} />
      </View>
    );
  }
}

export default GamesScreen;
