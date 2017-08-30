import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';
import Platform2 from './Platform2.js';

class App extends React.Component {

  render() {

    return (
      <div>
          <Platform2/>
      </div>
    )
  }
}

export default App;
