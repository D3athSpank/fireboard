import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import Panel from './panel'
import Firebase from "../firebase/firebase-api";

export default class GamesScreen extends Component {
  
  render() {
    return (
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
      </View>
    );
  }
}
