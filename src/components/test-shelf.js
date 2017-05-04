import React from 'react';
import moment from 'moment';



const Item = ({data}) => {
  
  const day = moment(data.roastDate);

  return (
    <div className="coffee-item">
      <p>{data.coffeeName} by {data.roasterName}</p>
      <p className="coffee-size">{data.coffeeSize}</p>
      <p>Roasted {day.fromNow()} </p>
    </div>)

  //render a strikethrough if gone is true

}

const CoffeeShelf = ({shelfData}) => {
  return (
    <div className="coffee-list">
      {shelfData.Shelf.map(coffee =>  <Item data={coffee} key={coffee.roastDate} />)}
    </div>
  )

}

export default CoffeeShelf;
