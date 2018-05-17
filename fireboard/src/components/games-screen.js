<<<<<<< HEAD
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import Firebase from '../firebase/firebase-api';
=======
import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import Panel from './panel'
import Firebase from "../firebase/firebase-api";
>>>>>>> 5c27a76a1b8e0c582ef22899990c5abc8b28ac95

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
<<<<<<< HEAD
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
=======
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Panel style={{ flex: 0.5 }}>
          <Text style={{ color: "white",borderBottomWidth:1,borderBottomColor:'black', textAlign: "center", fontSize: 20 }}>
            Somewhat ongoing Games:
          </Text>
        </Panel>
        <Panel style={{ flex: 0.5}}>
          <Text style={{ color: "white", borderBottomWidth:1,borderBottomColor:'black',textAlign: "center", fontSize: 20 }}>
            Winner and losers:
          </Text>
          <Button
            title="New game"
            onPress={() =>
              this.props.navigation.navigate("CreateGame", {
                title: "Create new game"
              })
            }
          />
        </Panel>
>>>>>>> 5c27a76a1b8e0c582ef22899990c5abc8b28ac95
      </View>
    );
  }
}
<<<<<<< HEAD
=======

export default GamesScreen;
>>>>>>> 5c27a76a1b8e0c582ef22899990c5abc8b28ac95
