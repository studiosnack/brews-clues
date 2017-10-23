// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';

import {receiveCoffee} from './actions/coffee';

import AppBody from './components/app-body';
import AppHeader from './components/app-header';
import FirebaseData from './database/data';

import './App.css';

class App extends Component {
  render() {
    // dispatch is injected by `connect` and we'll use it to
    // update the redux store.
    const {dispatch} = this.props;

    return (
      <div className="App">
        <AppHeader />
        <AppBody />

        {this.props.uid && (
          // the reason this blocks on uid is because we _need_ it to
          // be able to query the database.
          // We may eventually decide that this FirebaseData is stupid
          // and use something else and embed our data dependencies
          // in some other less exotic way. ╮(. ❛ ᴗ ❛.)╭
          <FirebaseData
            location={`/coffees/${this.props.uid}`}
            onChildAdded={snap => dispatch(receiveCoffee(snap.val(), snap.key))}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.auth.user && state.auth.user.uid,
});

// you may remember that connect also can accept a second
// argument "mapDispatchToProps" that lets you hide the details
// of action creators as just props. We could do that here later
// as an optimization for aesthetics, but for now it's good to
// see what FirebaseData is doing and how it does it
export default connect(mapStateToProps)(App);
