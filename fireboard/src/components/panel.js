import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Panel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	let { style } = { ...this.props };
	console.log(style);
	if(!style.flex){
		style.flex= 1;
	}
    style = { ...style, margin: 10,borderRadius: 10, marginBottom:5, backgroundColor: "#007F00" };
    return (
      <View
        style={style}
      >
        {this.props.children}
      </View>
    );
  }
}
