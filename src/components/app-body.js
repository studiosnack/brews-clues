// @flow

import React, {Component} from 'react';

import FancierCarouselBrewForm from './brew-input.js';
import FancierCoffeeForm from './coffee-input.js';
import AddCoffeeForm from './temporary-add-to-db-component';
import CoffeeShelf from './test-shelf.js';
import Carousel from './carousel.js'


class SimpleAppBody extends Component {

  render() {
    return <div className="App-body">


      <h2>Add Brew</h2>
      <div className="App-card">
        <FancierCarouselBrewForm />
      </div>

      <h2 className="card-heading">Add Coffee</h2>
      <div className="App-card">
        <FancierCoffeeForm />
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
