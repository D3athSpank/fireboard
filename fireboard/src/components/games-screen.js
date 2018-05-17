import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Panel from './panel';
import Firebase from '../firebase/firebase-api';

class GamesScreen extends Component {
  componentDidMount() {
    Firebase.listenToPlayers(p => this.setState({ players: p }));
    Firebase.listenToGames(games => console.log('GA', games));
    // Firebase.listenToGame('-LCiY1wtT4hkEKoYICf0', game =>
    //   console.log('GAME', game)
    // );
  }

  componentWillUnmount() {
    Firebase.unlistenToGames();
    Firebase.unlistenToPlayers();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Panel style={{ flex: 0.5 }}>
          <Text
            style={{
              color: 'white',
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              textAlign: 'center',
              fontSize: 20
            }}
          >
            Somewhat ongoing Games:
          </Text>
        </Panel>
        <Panel style={{ flex: 0.5 }}>
          <Text
            style={{
              color: 'white',
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              textAlign: 'center',
              fontSize: 20
            }}
          >
            Winner and losers:
          </Text>
          <Button
            title="New game"
            onPress={() => {
              // Firebase.updateGameScore('-LCiY1wtT4hkEKoYICf0', 10, 5);
              // Firebase.gameOver('-LCiY1wtT4hkEKoYICf0');
              // Firebase.newGame(
              //   this.state.players[0],
              //   this.state.players[1],
              //   'today',
              //   Expo.Constants.deviceId
              // );
              // this.props.navigation.navigate('CreateGame', {
              //   title: 'Create new game'
              // });
            }}
          />
        </Panel>
      </View>
    );
  }
}

export default GamesScreen;
