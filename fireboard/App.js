import React from 'react';
import AppRouter from './src/routing/router';

import Expo from 'expo';

import Firebase from './src/firebase/firebase-api';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    Firebase.init();
    //Firebase.newGame('tobias', 'marco', 'today', Expo.Constants.deviceId);
  }

  render() {
    return <AppRouter />;
  }
}
