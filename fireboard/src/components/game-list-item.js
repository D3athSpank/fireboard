import React, { Component } from "react";
import { View, Text, Image } from "react-native";

export default class GameListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const textStyle = {
      flex: 0.33,
	  textAlign: "center",
    paddingTop:10,
    fontSize:18,
	  color:'white'
	 
    };
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
		  padding: 5,
		  borderRadius:10,
		  margin:5,
          backgroundColor: this.props.even ? "#124f17" : "#26af32"
        }}
      >
	  <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain"
          }}
          source={
            this.props.game.home.picture
              ? {
                  uri: `data:image/jpeg;base64,${
                    this.props.game.home.picture
                  }`
                }
              : require("../img/user.png")
          }
        />
        <Text style={[textStyle]}>{this.props.game.home.nick}</Text>
        
        <Text style={[textStyle,{fontSize:18, color:'white'}]}>{`${(this.props.game.home.score &&
          this.props.game.home.score) ||
          "0"} - ${(this.props.game.visitor.score &&
          this.props.game.visitor.score) ||
          "0"}`}</Text>
        <Text style={textStyle}>{this.props.game.visitor.nick}</Text>
		<Image
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain"
          }}
          source={
            this.props.game.visitor.picture
              ? {
                  uri: `data:image/jpeg;base64,${
                    this.props.game.visitor.picture
                  }`
                }
              : require("../img/user.png")
          }
        />
      </View>
    );
  }
}
