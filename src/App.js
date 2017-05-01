// @flow

import React, { Component } from 'react';

import AppBody from './components/app-body';
import AppHeader from './components/app-header';


import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppBody />
      </div>
    );
  }
}


export default App;
