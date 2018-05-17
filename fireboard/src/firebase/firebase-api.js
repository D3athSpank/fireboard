import * as firebase from 'firebase';
import _ from 'lodash';

class Firebase {
  static init() {
    const config = {
      apiKey: 'AIzaSyDPRkLmGC6hkjCIvwwqTGLINd_MsPXQjWI',
      authDomain: 'fireboard-77452.firebaseapp.com',
      databaseURL: 'https://fireboard-77452.firebaseio.com',
      projectId: 'fireboard-77452',
      storageBucket: 'fireboard-77452.appspot.com',
      messagingSenderId: '907071679551'
    };

    if (!this.firebaseInstance) {
      this.firebaseInstance = firebase.initializeApp(config);
      console.log('FB initialised');
    }
  }

  static get instance() {
    return this.firebaseInstance;
  }

  static formatError(error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'email already used';
      case 'auth/invalid-email':
        return 'email not valid';
      case 'auth/operation-not-allowed':
        return 'Zou are not authorized';
      case 'auth/weak-password':
        return 'Weak password';
      case 'auth/user-disabled':
        return 'User is disabled';
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Wrong password';
      case 'auth/network-request-failed':
        return 'Connection failed';
      default:
        return JSON.stringify(error);
    }
  }

  static logError = error => {
    console.log(`FB failure: ${Firebase.formatError(error)}`);
  };

  static snapToArray = snap => {
    const items = [];

    snap.forEach(s => {
      items.push({ id: s.key, ...s.val() });
    });

    return items;
  };

  static listenToPlayers(f) {
    Firebase.instance
      .database()
      .ref('/players')
      .on('value', snap => f(Firebase.snapToArray(snap)));
  }

  static unListenToPlayers(f) {
    Firebase.instance
      .database()
      .ref('/players')
      .off('value', f);
  }

  static listenToGames(f) {
    Firebase.instance
      .database()
      .ref('/games')
      .on('value', snap => f(Firebase.snapToArray(snap)));
  }

  static unListenToGames(f) {
    Firebase.instance
      .database()
      .ref('/games')
      .off('value', f);
  }

  static listenToGame(gameId, f) {
    Firebase.instance
      .database()
      .ref(`games/${gameId}`)
      .on('value', snap => f(snap.val()));
  }

  static unListenToGame(gameId, f) {
    Firebase.instance
      .database()
      .ref(`games/${gameId}`)
      .off('value', f);
  }

  static newGame = async (home, visitor, date, deviceId) => {
    try {
      const games = Firebase.instance.database().ref('games');
      await games.push({
        home: { ...home, score: 0 },
        visitor: { ...visitor, score: 0 },
        date,
        deviceId,
        live: true
      });
    } catch (error) {
      Firebase.logError(error);
    }
  };

  static updateGameScore = async (gameId, homeScore, visitorScore) => {
    try {
      let scoreRef = Firebase.instance
        .database()
        .ref(`games/${gameId}/home/score`);
      await scoreRef.update({ score: homeScore });
      scoreRef = Firebase.instance
        .database()
        .ref(`games/${gameId}/visitor/score`);
      await scoreRef.update({ score: visitorScore });
    } catch (error) {
      Firebase.logError(error);
    }
  };

  static gameOver = async gameId => {
    try {
      const gameRef = Firebase.instance.database().ref(`games/${gameId}/live`);
      await gameRef.update({ live: false });
    } catch (error) {
      Firebase.logError(error);
    }
  };

  static newPlayer = async (nick, picture = null) => {
    try {
      const players = Firebase.instance.database().ref('players');
      const newUser = await players.push({ nick, picture });

      // console.log('NU', newUser.key);
      // console.log(picture);
      // if (picture) {
      //   const playersPics = Firebase.instance.storage().ref('players');
      //   const playerPic = playersPics.child(nick);
      //   await playerPic.putString(picture,'base64');
      // }
    } catch (error) {
      Firebase.logError(error);
    }
  };
}

export default Firebase;
