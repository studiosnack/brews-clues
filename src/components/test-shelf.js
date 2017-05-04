import React from 'react';


const Item = ({data}) => {
  return (
    <div className="coffee-item">
      <p>{data.coffeeName} by {data.roasterName}</p>
      <p className="coffee-size">{data.coffeeSize}</p>
      <p>Roasted on {data.roastDate} </p>
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
