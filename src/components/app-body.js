// @flow

import React, {Component} from 'react';

import LoginJunk from './login-junk.js';


class SimpleAppBody extends Component {

  render() {
    return <div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>

      <LoginJunk />


    </div>
  }

};

export default SimpleAppBody;
