import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import './index.css';


const config = {
  apiKey: "AIzaSyCiksOUFfr8OR8ghevuDDzN0MtESAygBlA",
  authDomain: "brews-clues.firebaseapp.com",
  databaseURL: "https://brews-clues.firebaseio.com",
  projectId: "brews-clues",
  storageBucket: "brews-clues.appspot.com",
  messagingSenderId: "33324339221"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
