import React, {Component} from 'react';
import { View, Text } from 'react-native'

export default class Panel extends Component {
	constructor(props) {
    	super(props)
	}
	
	render() {
		return (
			<View style={{margin: 10, padding: 10, backgroundColor: '#007F00', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				{this.props.children}
			</View>
		);
	}
}