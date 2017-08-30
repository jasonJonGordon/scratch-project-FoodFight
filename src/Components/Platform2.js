import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';
import Thumbnails from './Thumbnails';
import Buttons from './Buttons';
import { Grid, ButtonToolbar, ToggleButtonGroup, ToggleButton, ButtonGroup, Button } from 'react-bootstrap';

class Platform2 extends React.Component {
  constructor() {
    super();
    this.state = {
      options: [],
      yelp: {},
    }
  }

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('updateCount', this.updateCount);
    this.socket.on('newVote', this.newVote);
    this.socket.on('updateYelp', this.updateYelp);
  }

  emit = ((event, data) => {
    this.socket.emit(event, data);
  })

  vote = ((event) => {
    event.preventDefault();

    this.emit("vote", [this.refs.foodtype.value, this.refs.user.value]);
    this.refs.foodtype.value = "";
  })

  newVote = ((event, food) => {
    event.preventDefault();
    this.emit("vote", [food, this.refs.user.value]);
  })

  updateCount = ((choice) => {
    const state = Object.keys(choice).map((food) => {
      let options = {};
      options.name = food;
      options.votes = choice[food].length;
      options.voters = choice[food];
      return options;
    });
    state.sort((a, b) => b.votes - a.votes);
    this.setState({options: state});
  })

  updateYelp = ((yelp) => {
    this.setState({ yelp });
    // console.log(this.state.yelp);
  })

  render() {
    const newFoodList = this.state.options.map((foodtype) =>
    <Buttons foodtype={foodtype.name} username={foodtype.voters[0].name} newVote={this.newVote} voters={foodtype.voters} totalVotes={foodtype.votes}/>)

    const newLocations = <Thumbnails name={this.state.yelp.name} src={this.state.yelp.image_url} url={this.state.yelp.url} phone={this.state.yelp.phone} location={this.state.yelp.location} />

    return (
      <div>
        <form onSubmit={this.vote}>
          <fieldset>
            User:
            <input type="text" ref="user"/>
            Enter Food:
            <input type="text" ref="foodtype"/>
            <input type="submit" value="Submit" />
          </fieldset>
        </form>
        <div>
          <ButtonGroup>
            {newFoodList}
          </ButtonGroup>
        </div>
        <Grid>
          {newLocations}
        </Grid>
      </div>
    )
  }
}


export default Platform2;
