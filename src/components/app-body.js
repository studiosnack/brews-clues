// @flow

import React, {Component} from 'react';

import LoginJunk from './login-junk.js';
import FancyInput from './input-stuff.js';
import AddCoffeeForm from './temporary-add-to-db-component';
import CoffeeShelf from './test-shelf.js';


// my test variable

var testShelf = {
  Shelf: [
    {
      coffeeName: "La Laguna", 
      roasterName: "Kuma Coffee", 
      roastDate: 1495324800000, 
      coffeeSize: "12 oz",
      gone: false
    }, 
    {
      coffeeName: "Timepiece", 
      roasterName: "Tweed Coffee", 
      roastDate: 1494028800000, 
      coffeeSize: "16 oz",
      gone: true
    }, 
    {
      coffeeName: "Lotus", 
      roasterName: "Barrett's", 
      roastDate: 1492214400000,
      coffeeSize: "16 oz",
      gone: true
    }
  ]
};


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

      <CoffeeShelf shelfData={testShelf} />
    </div>
  }

};

export default SimpleAppBody;
