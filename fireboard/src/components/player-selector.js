import React, { Component } from "react";
import Panel from "../components/panel";
import { Text, Picker, Image } from "react-native";
// import { ActivityIndicator } from "react-native";
// import { View, Text, Button, Picker, Image } from "react-native";
// import { FloatingAction } from 'react-native-floating-action';

export default class PlayerSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPlayer: null
		}
	}

	getPickerItems() {
		console.log("pickerItems", this.props.players)
		return this.props.players.map((p, i) => {
			return <Picker.Item key={i} label={p.nick} value={p.id} />
		});
	}

	render() {
		
		return (
			<Panel style={{ flex: 0.5 }}>
				
				<Text style={{ color: "white", textAlign: "center", fontSize: 38 }}>Combatant #{this.props.isPlayerOne ? "1" : "2"}</Text>
				<Picker
					selectedValue={this.props.selectedPlayer && this.props.selectedPlayer.id || null}
					style={{ height: 50, width: "100%", color: "white" }}
					textStyle={{fontSize: 20}}
					onValueChange={(value) => {
						this.props.onPlayerSelected(value, this.props.isPlayerOne);
					}}
				>
					<Picker.Item label={`Select player ${this.props.isPlayerOne ? "one" : "two"}`} value={""} />
					{this.getPickerItems()}
				</Picker>
				{this.props.selectedPlayer && 
					<Image
						style={{
							flex: 1,
							width: null,
							height: null,
							resizeMode: "contain"
						}}
						source={this.props.selectedPlayer.picture ? {uri:`data:image/jpeg;base64,${this.props.selectedPlayer.picture}`} : require("../img/user.png")}
					/>}
			</Panel>
		)
	}
}
	