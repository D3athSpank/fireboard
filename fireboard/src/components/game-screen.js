import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import Panel from './panel';
import Firebase from '../firebase/firebase-api';
import Expo from 'expo';

export default class GameScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameId: props.navigation.state.params.id,
			game: null,
			readOnly: undefined
		}
	}

	componentDidMount() {
		Firebase.listenToGame(this.state.gameId, game => { 
			console.log(game);

			this.setState({
				game,
				readOnly: game.deviceId !== Expo.Constants.deviceId || !game.live
			})
		});
	}

	componentWillUnmount() {
		Firebase.unListenToGame(this.state.gameId);
	}

	homePlusPoint() {
		let score = this.state.game.home.score + 1;
		Firebase.updateGameScore(this.state.gameId, score, this.state.game.visitor.score);
	}

	homeMinusPoint() {
		let score = this.state.game.home.score - 1;
		Firebase.updateGameScore(this.state.gameId, score, this.state.game.visitor.score);
	}

	visitorPlusPoint() {
		let score = this.state.game.visitor.score + 1;
		Firebase.updateGameScore(this.state.gameId, this.state.game.home.score, score);
	}

	visitorMinusPoint() {
		let score = this.state.game.visitor.score - 1;
		Firebase.updateGameScore(this.state.gameId, this.state.game.home.score, score);
	}

	render() {
		if(!this.state.game) {
			return null;
		}

		const columnStyle = { 
			flex: 0.33,
			flexDirection: 'column',
			alignItems: 'center'
		};

		const scoreButtonStyle = {
			backgroundColor: '#fff',
			borderBottomWidth: 1,
			borderBottomColor: '#ccc',
			padding: 5,
			width: 25
		}

		return (
			
			<View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
				<Panel style={{ flex: 0.5, justifyContent: 'center'}}>
					<View style={{flexDirection: 'row'}}>
						<View style={columnStyle}>
							<Image
								style={{
									width: 50,
									height: 50
								}}
								source={this.state.game.home.picture ? {uri:`data:image/jpeg;base64,${this.state.game.home.picture}`} : require("../img/user.png")}
							/>
							<Text style={{textAlign: 'center', color: '#fff'}}>{this.state.game.home.nick}</Text>
							{!this.state.readOnly && 
								<View style={{flexDirection: 'row'}}>
									<TouchableOpacity style={scoreButtonStyle} onPress={() => this.homePlusPoint()}><Text style={{textAlign: 'center'}}>+</Text></TouchableOpacity>
									<TouchableOpacity style={{...scoreButtonStyle, marginLeft: 5}} onPress={() => this.homeMinusPoint()}><Text style={{textAlign: 'center'}}>-</Text></TouchableOpacity>
								</View>
							}
						</View>

						<View style={columnStyle}>
							<Text style={{textAlign: 'center', color: '#fff', fontSize: 35}}>{`${this.state.game.home.score || '0'} - ${this.state.game.visitor.score || '0'}`}</Text>
						</View>

						<View style={columnStyle}>
							<Image
								style={{
									width: 50,
									height: 50
								}}
								source={this.state.game.visitor.picture ? {uri:`data:image/jpeg;base64,${this.state.game.visitor.picture}`} : require("../img/user.png")}
							/>
							<Text style={{textAlign: 'center', color: '#fff'}}>{this.state.game.visitor.nick}</Text>
							{!this.state.readOnly && 
								<View style={{flexDirection: 'row'}}>
									<TouchableOpacity style={scoreButtonStyle} onPress={() => this.visitorPlusPoint()}><Text style={{textAlign: 'center'}}>+</Text></TouchableOpacity>
									<TouchableOpacity style={{...scoreButtonStyle, marginLeft: 5}} onPress={() => this.visitorMinusPoint()}><Text style={{textAlign: 'center'}}>-</Text></TouchableOpacity>
								</View>
							}
						</View>
					</View>
				</Panel>
			</View>
		);
	}
}