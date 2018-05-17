import React from 'react';
import { StackNavigator } from 'react-navigation';

import GamesScreen from '../components/games-screen';
import CreateGameScreen from '../components/create-game-screen';

export default StackNavigator({
    Games: GamesScreen,
    CreateGame: CreateGameScreen
})