import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Panel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	let { style } = { ...this.props };
	if(!style.flex){
		style.flex= 1;
	}
    style = { ...style,padding:10, margin: 10,borderRadius: 10, marginBottom:2, backgroundColor: "#007F00" };
    return (
      <View
        style={style}
      >
        {this.props.children}
      </View>
    );
  }
}
