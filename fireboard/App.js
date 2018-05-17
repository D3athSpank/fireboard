import React from 'react';
import AppRouter from './src/routing/router';

import Expo from 'expo';

import Firebase from './src/firebase/firebase-api';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    Firebase.init();

    //Firebase.newGame('tobias', 'marco', 'today', Expo.Constants.deviceId);
    // Firebase.addPlayer(
    //   'polpa',
    //   new Uint8Array([
    //     0x48,
    //     0x65,
    //     0x6c,
    //     0x6c,
    //     0x6f,
    //     0x2c,
    //     0x20,
    //     0x77,
    //     0x6f,
    //     0x72,
    //     0x6c,
    //     0x64,
    //     0x21
    //   ])
    // );
  }

  render() {
    return <AppRouter />;
  }
}
