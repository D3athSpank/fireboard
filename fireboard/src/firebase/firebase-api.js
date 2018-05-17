import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDPRkLmGC6hkjCIvwwqTGLINd_MsPXQjWI",
    authDomain: "fireboard-77452.firebaseapp.com",
    databaseURL: "https://fireboard-77452.firebaseio.com",
    projectId: "fireboard-77452",
    storageBucket: "fireboard-77452.appspot.com",
    messagingSenderId: "907071679551"
  };

 export const init = () => {
    firebase.initializeApp(config);
    console.log('FB init done')
}
