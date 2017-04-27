// @flow

import React, {Component} from 'react';

import LoginJunk from './login-junk.js';
import AddCoffeeForm from './temporary-add-to-db-component';


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

      <div>
        <AddCoffeeForm />
      </div>

    </div>
  }

};

export default SimpleAppBody;
