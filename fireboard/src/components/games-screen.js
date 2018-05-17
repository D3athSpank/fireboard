import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Firebase from '../firebase/firebase-api';

class GamesScreen extends Component {
  componentDidMount() {
    Firebase.listenToGames(snap => console.log(snap));
  }

  componentWillUnmount() {
    Firebase.unlistenToGames();
  }

  render() {
    return (
      <View>
        <Text>I'm the games screen</Text>
      </View>
    );
  }
}

export default GamesScreen;
