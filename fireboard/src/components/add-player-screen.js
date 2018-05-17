<<<<<<< HEAD
import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text, Button } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Panel from './panel';
=======
import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View, Text, Button, TextInput } from "react-native";
import { ActivityIndicator } from "react-native";
import Panel from "./panel";
>>>>>>> 5c27a76a1b8e0c582ef22899990c5abc8b28ac95
export default class AddPlayerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Add player`,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white'
    }
  });
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      picturePath: ""
    };
  }
  render() {
    return (
<<<<<<< HEAD
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Panel style={{ flex: 0.5 }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'contain'
            }}
            source={require('../img/user.png')}
=======
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Panel style={{ flex: 0.5, justifyContent: "center" }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 38 }}>
            Cool stage name?
          </Text>
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            Enter it here
          </Text>
          <TextInput
            style={{ height: 40, fontSize: 28 }}
            onChangeText={text => this.setState({ newName: text })}
            value={this.state.newName}
>>>>>>> 5c27a76a1b8e0c582ef22899990c5abc8b28ac95
          />
        </Panel>
        <Panel style={{ flex: 0.5 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
                this.props.navigation.navigate("Camera", {
                  title: "Ugly face time!"
                })}
          >
          <Text style={{ color: "white", textAlign: "center", fontSize: 38 }}>
           Ugly face?
          </Text>
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
           Press icon below to show it!
          </Text>
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain"
              }}
              source={require("../img/user.png")}
            />
          </TouchableOpacity>
        </Panel>
      </View>
    );
  }
}
