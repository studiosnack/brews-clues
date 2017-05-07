// @flow

import React, { Component } from 'react';
import {connect} from 'react-redux'

import AppBody from './components/app-body';
import AppHeader from './components/app-header';

import firebase from 'firebase';

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

  // Alright! Here we go lifecycle party!!
  //
  // I am not totally happy with this approach:
  // Typically, the approach when adding an event listener is to put it
  // in componentDidMount. The problem is that only runs once (on mount)
  // but when the whole webapp loads, a userid doesn't exist yet, firebase
  // is still trying to get a handle on whether or not somebody is still
  // logged in or not. So instead, i let the component render and then if
  // the uid ever shows up, it then creates the subscription for the brew.
  componentDidUpdate(prevProps) {
    const {uid} = this.props;
    if (uid) {
      const userBrews = firebase.database().ref(`/brews/${uid}`);
      userBrews.on('value', snapshot => {
        console.log(snapshot.val())
      })
    }
  }
}

const mapStateToProps = state => ({
  uid: state.auth.user && state.auth.user.uid,
})

export default connect(mapStateToProps)(App);
