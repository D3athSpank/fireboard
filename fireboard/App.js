import React from 'react';
import AppRouter from './src/routing/router'

import { init } from './src/firebase/firebase-api'

export default class App extends React.Component {
  render() {
    init()
    
    return (
      <AppRouter />
    );
  }
}
