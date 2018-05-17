import React, { Component } from "react";
import Panel from "../components/panel";
import { ActivityIndicator } from "react-native";
import { View, Text, Button, Picker, Image } from "react-native";
import { FloatingAction } from "react-native-floating-action";

export default class CreateGameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
      players: [
        {
          id: 1,
          name: "Rikard",
          avatar:
            "http://i0.kym-cdn.com/entries/icons/original/000/003/549/Dolan.jpg"
        },
        {
          id: 2,
          name: "Knugen",
          avatar:
            "http://i0.kym-cdn.com/entries/icons/original/000/003/549/Dolan.jpg"
        },
        {
          id: 3,
          name: "Foppa",
          avatar:
            "http://i0.kym-cdn.com/entries/icons/original/000/003/549/Dolan.jpg"
        }
      ]
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `New Game`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  getPickerItems() {
    return this.state.players.map((p, i) => {
      return <Picker.Item key={i} label={p.name} value={p.id} />;
    });
  }

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
		color:'green'
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
        <Panel style={{ flex: 0.5 }}>
          {/* TODO: create player selector component */}
          <Text>Player 1</Text>
          <Picker
            selectedValue={
              (this.state.playerOne && this.state.playerOne.id) || null
            }
            style={{ height: 50, width: 150 }}
            onValueChange={value => {
              this.onPlayerSelected(value, true);
            }}
          >
            <Picker.Item label={"Select player one"} value={""} />
            {this.getPickerItems()}
          </Picker>
        </Panel>

        <Panel style={{ flex: 0.5 }}>
          <Text>Player 2</Text>
          <Picker
            selectedValue={
              (this.state.playerTwo && this.state.playerTwo.id) || null
            }
            style={{ height: 50, width: 150 }}
            onValueChange={value => {
              this.onPlayerSelected(value, false);
            }}
          >
            <Picker.Item label={"Select player two"} value={""} />
            {this.getPickerItems()}
          </Picker>
        </Panel>

        <FloatingAction
          actions={actions}
          onPressItem={name => {
            switch (name) {
              case "add_player":
                this.props.navigation.navigate("AddPlayer", {
                  title: "Add new player"
                });
                break;
              case "add_player":
                console.log("start game");
                break;
              default:
                break;
            }
            console.log(`selected button: ${name}`);
          }}
        />
      </View>
    );
  }
}
