// @flow

import React, { Component } from 'react';

import AppBody from './components/app-body';

import logo from './logo.svg';

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

const AppHeader = () => (
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to Brews</h2>
  </div>
);


export default App;
