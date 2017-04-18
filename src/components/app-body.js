// @flow

import React, {Component} from 'react';

import LoginJunk from './login-junk.js';



const FancyInput = (props) => {
    return <label> {props.label} <input name={props.name} type="text" /></label>;
    }

class SimpleAppBody extends Component {

  render() {
    return <div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>

      <LoginJunk />


      <FancyInput label="Amount (g)" name="amount" />
      <FancyInput label="Time" name="time" />



    </div>
  }

};

export default SimpleAppBody;
