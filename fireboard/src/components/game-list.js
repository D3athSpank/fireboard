import React, { Component } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import Panel from "./panel";
import GameListItem from "./game-list-item";


export default class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const headerStyle = {
      color: "white",
      borderBottomWidth: 1,
      borderBottomColor: "#fff",
      textAlign: "center",
      fontSize: 20
    };

    

    if (!this.props.games || !this.props.games.length) {
      return null;
    }

    return (

      <Panel style={{ flex: 0.5 }}>
        <Text style={headerStyle}>{this.props.title}</Text>

        {this.props.games &&
          this.props.games.length > 0 && (
            <ScrollView style={{ marginTop: 5 }}>
              {this.props.games.map((g, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={{ flex: 1 }}
                    onPress={() => this.props.onOpenGame(g)}
                  >
                    <GameListItem game={g} even={i % 2 === 0} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

       
      </Panel>
    );
  }
}
