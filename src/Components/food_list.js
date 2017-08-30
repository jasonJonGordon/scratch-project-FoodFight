import React from 'react';
import VotersList from './VotersList';

class FoodList extends React.Component {

  passer = (event) => {
    this.props.newVote(event, this.props.foodtype);
  }

  render() {
    const totalVotersList = this.props.voters.map((voters, i) => <VotersList key={i} name={voters.name} />)
    return (
    <ul>
      <li id="choices" onClick={this.passer} className="list-group-item">{this.props.foodtype} Total Votes: {this.props.totalVotes}</li>
      Voters: <li>{totalVotersList}</li>
    </ul>
    )
  }

}

export default FoodList;
