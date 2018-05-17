import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import { View, Text,Button } from 'react-native'

export default class CreateGameScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
    title: `New Game`,
		headerTitleStyle : {textAlign: 'center', alignSelf:'center'},
		headerStyle:{
				backgroundColor:'white',
		},
	});
	render() {
		return (
			<View >
				<Text>I'm the create game screen</Text>
				
			{/* Should be replaced with circular + button menu */}
				<Button title='Add Player' onPress={() => this.props.navigation.navigate('AddPlayer', {title: 'Add new player'})}></Button>
			</View>
		);
	}
}