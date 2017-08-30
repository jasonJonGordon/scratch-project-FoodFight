import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';
import FoodList from './food_list';

class Platform2 extends React.Component {
  constructor() {
    super();
    this.state = {
      options: []
    }
  }

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('updateCount', this.updateCount);
    this.socket.on('newVote', this.newVote);
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


  render() {
    const newFoodList = this.state.options.map((foodtype) =>
    <FoodList foodtype={foodtype.name} username={foodtype.voters[0].name} totalVotes={foodtype.votes} voters={foodtype.voters} newVote={this.newVote}/>)

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
        {newFoodList}
      </div>
      </div>
    )
  }
}


export default Platform2;
