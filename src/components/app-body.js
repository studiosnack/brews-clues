// @flow

import React, {Component} from 'react';

import FancierForm from './input-stuff.js';
import AddCoffeeForm from './temporary-add-to-db-component';
import CoffeeShelf from './test-shelf.js';


class SimpleAppBody extends Component {

  render() {
    return <div className="App-body">

      <h2>Add Brew</h2>
      <div className="App-card">
        <FancierForm />
      </div>

      <h2>Add JSON</h2>
      <div className="App-card">
        <div>
          <AddCoffeeForm />
        </div>
      </div>

      <h2 className="card-heading">Your Coffees</h2>
      <div className="App-card">
        <CoffeeShelf />
      </div>
    </div>
  }

};

export default SimpleAppBody;
