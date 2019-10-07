import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCm5gJORap8XfQDGalEC58xNUi2PTkP5io',
  authDomain: 'basa-chat.firebaseapp.com',
  databaseURL: 'https://basa-chat.firebaseio.com',
  projectId: 'basa-chat',
  storageBucket: 'basa-chat.appspot.com',
  messagingSenderId: '39799028396',
  appId: '1:39799028396:web:e9eeeb4a7e5c715a8ffd09',
};

let app = firebase.initializeApp(firebaseConfig);

export const Database = app.database();
export const Auth = app.auth();
