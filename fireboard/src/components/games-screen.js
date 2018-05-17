import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import Firebase from '../firebase/firebase-api';

export default class GamesScreen extends Component {
  componentDidMount() {
    Firebase.listenToPlayers(games => console.log('PL', games));
    Firebase.listenToGames(games => console.log('GA', games));
  }

  componentWillUnmount() {
    Firebase.unlistenToGames();
    Firebase.unlistenToPlayers();
  }
  render() {
    return (
      <View>
        <Text>I'm the games screen</Text>
        <Button
          title="New game"
          onPress={() =>
            this.props.navigation.navigate('CreateGame', {
              title: 'Create new game'
            })
          }
        />
      </View>
    );
  }
}
