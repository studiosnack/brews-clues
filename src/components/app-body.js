// @flow

import React, {Component} from 'react';

import LoginJunk from './login-junk.js';
import AddCoffeeForm from './temporary-add-to-db-component';


// my test variables

var arr = ["Tweed", "Counter Culture", "Yirg"];

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


// components

const FancyInput = (props) => {
  return <label className="input-label"> {props.label} <input name={props.name} type="text" /></label>;
}

const Item = ({data}) => {
  return (
    <div className="coffee-list">
      <p>{data.coffeeName} by {data.roasterName}</p>
      <p className="coffee-size">{data.coffeeSize}</p>
      <p>Roasted on {data.roastDate} </p>
    </div>)
  
  //render a strikethrough if gone is true

}

const CoffeeShelf = () => { 
  return (
    <div>
      {testShelf.Shelf.map(coffee =>  <Item data={coffee} key={coffee.roastDate} />)}
    </div>
  )

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

      <CoffeeShelf shelfData={testShelf} />
    </div>
  }

};

export default SimpleAppBody;
