import React from 'react';


const SomeComponent = () => {
	return <div> Component 1 </div>
}

const SomeOtherComponent = () => {
	return <div> Component 2 </div>
}

const SomeFinalComponent = () => {
	return <div> Component 3 </div>
}

///

class Carousel extends React.Component {
  constructor(props){
    super(props);
    this.state = {page:1};
  }

  goTo = (pageNumber) => {
    console.log("before " + this.state.page);
    this.setState({
      page: pageNumber
    });
    console.log("after " + this.state.page);
  }

render() {

  return <div>
    { this.state.page === 1 && <SomeComponent />}
    { this.state.page === 2 && <SomeOtherComponent />}
    { this.state.page === 3 && <SomeFinalComponent />}


    {this.state.page > 1 &&
      <button onClick={()=>this.goTo(this.state.page-1)}>
        <span> Prev </span>
      </button> }

    {this.state.page < 3 &&
      <button onClick={()=>this.goTo(this.state.page+1)}>
        <span> Next </span>
      </button> }




  </div>
}

}

export default Carousel;