import React from 'react';

class FoodList extends React.Component {

  passer = (event) => {
    this.props.newVote(event, this.props.foodtype);
  }

  render() {
    return (
      <li onClick={this.passer} className="list-group-item">{this.props.foodtype} Total Votes: {this.props.totalVotes}</li>
    );
  }

}

export default FoodList;
