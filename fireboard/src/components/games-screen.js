import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';

export default class GamesScreen extends Component {
	render() {
		return (
			<View>
				<Text>I'm the games screen</Text>
				<Button title='New game' onPress={() => this.props.navigation.navigate('CreateGame', {title: 'Create new game'})}></Button>
			</View>
		);
	}
}
