import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import { View, Text } from 'react-native'

export default class CreateGameScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
		headerTitleStyle : {textAlign: 'center', alignSelf:'center'},
		headerStyle:{
				backgroundColor:'white',
		},
	});
	render() {
		return (
			<View >
				<Text>I'm the create game screen</Text>
			</View>
		);
	}
}