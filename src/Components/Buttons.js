import React, { Component } from 'react';
import { ToggleButton, Button } from 'react-bootstrap';
import VotersList from './VotersList';

class Buttons extends Component {

  passer = (event) => {
    this.props.newVote(event, this.props.foodtype);
  }

  render() {
    const totalVotersList = this.props.voters.map((voters) => <VotersList name={voters.name} />)
    return (
      <div>
        <Button onClick={this.passer}>{this.props.foodtype} Total Votes: {this.props.totalVotes} <ul>{totalVotersList}</ul></Button>
      </div>
    )
  }
}

export default Buttons;
