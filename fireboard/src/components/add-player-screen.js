import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text, Button } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Panel from './panel';
export default class AddPlayerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Add player`,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white'
    }
  });

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Panel style={{ flex: 0.5 }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'contain'
            }}
            source={require('../img/user.png')}
          />
        </Panel>
        <Panel style={{ flex: 0.5 }}>
          <Text>Hello</Text>
        </Panel>
      </View>
    );
  }
}
