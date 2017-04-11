// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducers';
import {notAuthed, handleUserAuthed} from './actions/auth';

import App from './App';

import './index.css';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const config = {
  apiKey: "AIzaSyCiksOUFfr8OR8ghevuDDzN0MtESAygBlA",
  authDomain: "brews-clues.firebaseapp.com",
  databaseURL: "https://brews-clues.firebaseio.com",
  projectId: "brews-clues",
  storageBucket: "brews-clues.appspot.com",
  messagingSenderId: "33324339221"
};
firebase.initializeApp(config);


// This is unique, it's probably one of the few actions we'll fire outside the
// context of the webapp, but only because firebase's auth works in this semi-
// global way.
firebase.auth().onAuthStateChanged(function(user) {
  // This is going to be weird initially because firebase handles this for us
  // but it will get across how redux wants you to think about actions etc
  if(user) {
    store.dispatch(handleUserAuthed(user));
  } else {
    store.dispatch(notAuthed());
  }
})


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
