import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { Jumbotron } from 'react-bootstrap';
import FoodList from './food_list';

class Platform2 extends React.Component {
  constructor() {
    super();
    this.state = {
      options: [
        {
          name: "Japanese"
        },
        {
          name: "Chinese"
        },
        {
          name: "American"
        }
      ]
    }
  }

  componentWillMount() {
      this.socket = io('http://localhost:3000');
      this.socket.on('connected', this.connected)
      this.socket.on('welcome', this.updateState)
      this.socket.on('onChinese', this.onChinese);
      this.socket.on('onReturnYesChinese', this.onReturnYesChinese);
      this.socket.on('voteCountUpdateChinese', this.voteCountUpdateChinese);
      this.socket.on('onJapanese', this.onJapanese);
      this.socket.on('onReturnYesJapanese', this.onReturnYesJapanese);
      this.socket.on('voteCountUpdateJapanese', this.voteCountUpdateJapanese);
      this.socket.on('onMexican', this.onMexican);
      this.socket.on('onReturnYesMexican', this.onReturnYesMexican);
      this.socket.on('voteCountUpdateMexican', this.voteCountUpdateMexican);
      this.socket.on('onItalian', this.onItalian);
      this.socket.on('onReturnYesItalian', this.onReturnYesItalian);
      this.socket.on('voteCountUpdateItalian', this.voteCountUpdateItalian);
  }

  emit = ((event, data) => {
      this.socket.emit(event, data);
  })

  vote = ((data) => {
    this.emit("vote", data);
  })

  updateState = ((serverState) => {
      this.setState(serverState);
  })

  connected = ((data) => {
      this.setState({ name: data.name });
  })

  onChinese = () => {
      this.emit('yesChinese');
  }

  onReturnYesChinese = ((data) => {
      this.setState({ count4Chinese: data.count4Chinese })
  })

  voteCountUpdateChinese = ((data) => {
      this.setState({ count4Chinese: data.count4Chinese })
  })

  onJapanese = () => {
      this.emit('yesJapanese');
  }

  onReturnYesJapanese = ((data) => {
      this.setState({ count4Japanese: data.count4Japanese })
  })

  voteCountUpdateJapanese = ((data) => {
      this.setState({ count4Japanese: data.count4Japanese })
  })

  onMexican = () => {
      this.emit('yesMexican');
  }

  onReturnYesMexican = ((data) => {
      this.setState({ count4Mexican: data.count4Mexican })
  })

  voteCountUpdateMexican = ((data) => {
      this.setState({ count4Mexican: data.count4Mexican })
  })

  onItalian = () => {
      this.emit('yesItalian');
  }

  onReturnYesItalian = ((data) => {
      this.setState({ count4Italian: data.count4Italian })
  })

  voteCountUpdateItalian = ((data) => {
      this.setState({ count4Italian: data.count4Italian })
  })



  render() {

    const newFoodList = this.state.options.map((foodtype, i) =>
    <FoodList foodtype={foodtype.name} totalVotes={foodtype.votes} position={i} vote={this.vote}/>
    )

    return (
      <div>
        <form>
          {newFoodList}
        </form>
      </div>
    )
  }
}

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
    contain: {
        wrapMargin: '30',
        padding: '50',
        backgroundImage: "url('http://www.nmgncp.com/data/out/124/4634171-food-wallpaper-background.jpg')"
    }
};

export default Platform2;
