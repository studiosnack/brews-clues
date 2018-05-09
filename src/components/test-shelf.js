import React from 'react';
import moment from 'moment';

import {connect} from 'react-redux';


const Item = ({data}) => {
  const day = moment(data.dateRoasted);

  return (
    <div className="coffee-item">
      <p>{data.coffeeName} by {data.roaster}</p>
      <p className="coffee-size">Size: {data.quantity}</p>
      <p>Roasted {day.fromNow()} </p>
      <p> {data.tags} </p>
    </div>);

  // render a strikethrough if gone is true
};

const CoffeeShelf = ({coffees}) => {
  const shelfData = Object.keys(coffees).map(key => [key, coffees[key]]);
  return (
    <div className="coffee-list">
      {shelfData.map(([key, coffee]) => <Item data={coffee} key={key} />)}
    </div>
  );
};

const mapStateToProps = state => ({
  coffees: state.coffee,
});

export default connect(
  mapStateToProps,
)(
  CoffeeShelf,
);
