import React from 'react';
import { StackNavigator } from 'react-navigation';

import GamesScreen from '../components/games-screen';
import CreateGameScreen from '../components/create-game-screen';
import AddPlayerScreen from '../components/add-player-screen'
import CameraScreen from '../components/camera-screen';

export default StackNavigator({
    Games: GamesScreen,
    CreateGame: CreateGameScreen,
    AddPlayer: AddPlayerScreen,
    Camera: CameraScreen
})