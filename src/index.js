import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {createStore} from 'redux';
import reducer from './reducers';

import {Provider} from 'react-redux';

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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
