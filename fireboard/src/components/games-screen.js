import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

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
        <Button title='New game' onPress={() => this.props.navigation.navigate("CreateGame", {title: 'Create new game'})}></Button>
      </View>
    );
  }
}

export default GamesScreen;
