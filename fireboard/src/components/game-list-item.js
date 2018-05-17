import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class GameListItem extends Component {
  constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const textStyle = { 
			flex: 0.33,
			textAlign: 'center'
		};
		return (
			<View style={{flex: 1, flexDirection: 'row', padding: 5, backgroundColor: this.props.even ?  '#ddd' : '#fff'}}>
				<Text style={textStyle}>{this.props.game.home.nick}</Text>
				<Text style={textStyle}>{`${this.props.game.home.score || '0'} - ${this.props.game.visitor.score || '0'}`}</Text>
				<Text style={textStyle}>{this.props.game.visitor.nick}</Text>
			</View>
		)
	}
}
  