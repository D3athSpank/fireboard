import React, {Component} from 'react';
import Panel from '../components/panel';
import {ActivityIndicator} from 'react-native';
import { View, Text, Button, Picker } from 'react-native'

export default class CreateGameScreen extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			playerOne: null,
			playerTwo: null
		};
	}

	static navigationOptions = ({ navigation }) => ({
    title: `New Game`,
		headerTitleStyle : {textAlign: 'center', alignSelf:'center'},
		headerStyle:{
				backgroundColor:'white',
		},
	});

	getPickerItems(){
		const players = [
			{name: "Rikard", avatar: "http://i0.kym-cdn.com/entries/icons/original/000/003/549/Dolan.jpg"}, 
			{name: "Knugen", avatar: "http://i0.kym-cdn.com/entries/icons/original/000/003/549/Dolan.jpg"}, 
			{name: "Foppa", avatar: "http://i0.kym-cdn.com/entries/icons/original/000/003/549/Dolan.jpg"}]

		return players.map((p, i) => {
			return <Picker.Item key={i} label={p.name} value={p} />
		});
	}

	render() {
		
		return (
			<Panel>
				<Text>Player 1</Text>
				<Picker
					selectedValue={this.state.playerOne || null}
					style={{ height: 50, width: 150 }}
					onValueChange={(value) => {
						this.setState({playerOne: value});
					}}
				>
					{this.getPickerItems()}
				</Picker>

				<Text>Player 2</Text>
				<Picker
					selectedValue={this.state.playerTwo || null}
					style={{ height: 50, width: 150 }}
					onValueChange={(value) => {
						this.setState({playerTwo: value});
					}}
				>
					{this.getPickerItems()}
				</Picker>
				<Text>{this.state.playerOne && this.state.playerOne.name || "nope"}</Text>
				{/* Should be replaced with circular + button menu */}
				<Button title='Add Player' onPress={() => this.props.navigation.navigate('AddPlayer', {title: 'Add new player'})}></Button>
			</Panel>
		);
	}
}