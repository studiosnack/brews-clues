// @flow

import React, {Component} from 'react';

import FancierBrewForm from './brew-input.js';
import FancierCoffeeForm from './coffee-input.js';
import AddCoffeeForm from './temporary-add-to-db-component';
import CoffeeShelf from './test-shelf.js';
import Carousel from './carousel.js'


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
    return <div className="App-body">

      <div className="App-card">
        <Carousel />
      </div>


      <h2 className="card-heading">Add Brew</h2>
      <div className="App-card">
        <FancierBrewForm />
      </div>

      <h2 className="card-heading">Add Coffee</h2>
      <div className="App-card">
        <FancierCoffeeForm />
      </div>

      <h2 className="card-heading">Add JSON</h2>
      <div className="App-card">
        <div>
          <AddCoffeeForm />
        </div>
      </div>

      <h2 className="card-heading">Your Coffees</h2>
      <div className="App-card">
        <CoffeeShelf shelfData={testShelf} />
      </div>
    </div>
  }

};

export default SimpleAppBody;
