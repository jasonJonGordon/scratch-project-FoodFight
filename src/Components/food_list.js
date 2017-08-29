import React from 'react';

class FoodList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  passer = (event) => {
    this.props.vote(this.props.foodtype, this.props.totalVotes);
  }

  render() {
    return(
    <li onClick={this.passer} className="list-group-item">{this.props.foodtype}</li>
    );
  }

}

export default FoodList;
