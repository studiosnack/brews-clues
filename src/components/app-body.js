// @flow

import React, {Component} from 'react';

import AddCoffeeForm from './temporary-add-to-db-component';


const FancyInput = (props) => {
    return <label> {props.label} <input name={props.name} type="text" /></label>;
    }

class SimpleAppBody extends Component {

  render() {
    return <div>

      <FancyInput label="Amount (g)" name="amount" />
      <FancyInput label="Time" name="time" />

      <div>
        <AddCoffeeForm />
      </div>

    </div>
  }

};

export default SimpleAppBody;
