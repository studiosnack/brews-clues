import React from 'react';
import {connect} from 'react-redux';

import {addCoffee} from '../database/coffee';
import {FancyInput, FancyButton} from './input-stuff.js'


const FirstPanel = (props) => {
  return (
    <div>
      <FancyInput label="Roaster " name="roaster" handleChange={props.handleChange}
        value={props.roaster}/>
      <FancyInput label="Date Roasted " name="dateRoasted" handleChange={props.handleChange}
        value={props.dateRoasted}/>
      <FancyInput label="Coffee Origin" name="origin" handleChange={props.handleChange}
        value={props.origin} />
      <FancyInput label="Price " name="price" handleChange={props.handleChange}
        value={props.price}/>
      <FancyInput label="Quantity " name="quantity" handleChange={props.handleChange}
        value={props.quantity} />
    </div>
  )
}

const SecondPanel = (props) => {
  return (
    <div>
      <FancyInput label="Tags " name="tags" handleChange={props.handleChange}
        value={props.tags}/>
      <FancyInput label="Tasting Notes " name="tastingNotes" handleChange={props.handleChange}
        value={props.tastingNotes}/>
      <FancyButton name="coffeeButton" handleSubmit={props.handleSubmit} buttonText="Add Coffee"/>
    </div>
 )
}


class FancyCarouselForm extends React.Component {
  constructor (props){
    super(props);
    this.state = {page:1}
  }

  handleChange = (evt) => this.setState({[evt.target.name]: evt.target.value});

  handleSubmit = (event) => {
    console.log("submit fired");

    event.preventDefault();

    const timeNow = new Date();

    const newCoffee = {
      dateCreated: timeNow.getTime(),
      roaster: this.state.roaster,
      dateRoasted: this.state.dateRoasted,
      origin: this.state.origin,
      price: this.state.price,
      quantity: this.state.quantity,
      tags: this.state.tags.split(',').map(str => str.trim()), // what if empty
      tastingNotes: this.state.tastingNotes.split(',').map(str => str.trim())
    };

    console.log(newCoffee);

    if (this.props.userid) {
      console.log("coffee added to database");
      addCoffee(this.props.userid, newCoffee);
    }
  }

  goTo = (pageNumber) => {
    this.setState({
      page: pageNumber
    });
  }

render() {

  return <div className="brew-input">
    { this.state.page === 1 && <FirstPanel handleChange={this.handleChange}
      roaster={this.state.roaster} dateRoasted={this.state.dateRoasted}
      origin={this.state.origin} price={this.state.price} quantity={this.state.quantity}/>}
    { this.state.page === 2 && <SecondPanel handleChange={this.handleChange}
      tags={this.state.tags} tastingNotes={this.state.notes} handleSubmit={this.handleSubmit}/>}

    {this.state.page > 1 &&
      <button className="carousel-btn" onClick={()=>this.goTo(this.state.page-1)}>
        <span> Prev </span>
      </button> }

    {this.state.page < 2 &&
      <button className="carousel-btn" onClick={()=>this.goTo(this.state.page+1)}>
        <span> Next </span>
      </button> }
  </div>
  }

}


const FancierCarouselCoffeeForm = connect(
  state => ({
    userid: state.auth && state.auth.user && state.auth.user.uid,
  })
)(FancyCarouselForm)


export default FancierCarouselCoffeeForm;
