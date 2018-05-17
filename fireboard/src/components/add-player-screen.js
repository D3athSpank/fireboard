import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, Button, TextInput } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Panel from './panel';
import Camera from './camera';
import { FloatingAction } from "react-native-floating-action";
import Firebase from '../firebase/firebase-api';
export default class AddPlayerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Add player`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      picturePath: ''
    };
  }
  canSave() {
    return this.state.newName.length > 0 && this.state.picturePath;
  }
  render() {
    let actions = [];
    actions.push({
      text: "Discard me, now!",
      icon: require("../../assets/check_icon.png"),
      name: "discard_player",
      position: 2,
      color: "red"
    });
    if (this.canSave()) {
      actions.push({
        text: "Forever store",
        icon: require("../../assets/user_plus_icon.png"),
        name: "save_player",
        position: 1,
        color: "green"
      });
    }
    if (this.state.showCamera) {
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Camera
            onPictureTaken={path => {
              console.log(path);
              this.setState({ picturePath: path, showCamera: false });
            }}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Panel style={{ flex: 0.3, justifyContent: "center" }}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 34 }}>
           Got a cool nick name?
          </Text>
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            {this.state.newName ?'' :'Enter it here'}
          </Text>
          <TextInput
            style={{ height: 40, fontSize: 28 }}
            onChangeText={text => this.setState({ newName: text })}
            value={this.state.newName}
          />
        </Panel>
        <Panel style={{ flex: 0.7 }}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 34 }}>
            {this.state.picturePath ? "Thats a ugly face!" : "Ugly face?"}
          </Text>
          <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
            {this.state.picturePath
              ? "Not your best side? Try again!"
              : "Press icon below to show it!"}
          </Text>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.setState({ showCamera: true })}
          >
            {this.state.picturePath ? (
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain",
                  borderRadius: 160
                }}
                source={{ isStatic: true, uri: this.state.picturePath }}
              />
            ) : (
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain"
                }}
                source={require("../img/user.png")}
              />
            )}
          </TouchableOpacity>
        </Panel>
        <FloatingAction
          actions={actions}
          onPressItem={onPress => {
            if (onPress == "discard_player") {
              this.setState({ picturePath: "", newName: "" });
            } else {
              
              Firebase.newPlayer(this.state.newName, this.state.picturePath);
              this.props.navigation.navigate("CreateGame");
            }
          }}
        />
      </View>
    );
  }
}
