import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import {ActivityIndicator} from 'react-native';
export default class AddPlayerScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
            headerTitleStyle : {textAlign: 'center', alignSelf:'center'},
            headerStyle:{
                    backgroundColor:'white',
            },
        });
	render() {
		return (
			<View>
				<Text>I'm the add player screen</Text>
				
			</View>
		);
	}
}
