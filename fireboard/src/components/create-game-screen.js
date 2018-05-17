import React, {Component} from 'react';
import { View, Text } from 'react-native'
import Panel from '../components/panel';

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
			<Panel>
				<Text>I'm children</Text>
			</Panel>
		);
	}
}