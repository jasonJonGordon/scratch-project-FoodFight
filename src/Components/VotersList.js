import React, { Component } from 'react';

class VotersList extends Component {
  render() {
    return (
      <li>{this.props.name}</li>
    )
  }
}

export default VotersList;
