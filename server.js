const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({ extended: true }));

// stores connections, votes and voters
const votes = {};
const count = {};
const users = [];

// listens for connect event when users join socket
io.on('connection', (socket) => {
  // pushes new users into our user collection (aka socket connections)
  users.push(socket.id);
  console.log('Connected: %s users', users.length);

  // remove disconnected socket from user & cancel votes
  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket), 1);
    const choice = votes[socket.id];
    if (count[choice]) {
      count[choice].splice(count[choice].indexOf(socket.id), 1);
      if (!count[choice].length) delete count[choice];
    }
    delete votes[socket.id];
    //console.log('disconnectCount: ', count);
    //console.log('disconnectVotes: ', votes);
    socket.emit('updateCount', count);
    socket.broadcast.emit('updateCount', count);
    socket.disconnect();
    console.log('Disconnected: %s users remaining', users.length);
  });

  // add or change vote and emit
  socket.on('vote', (choice) => {
    const id = socket.id;
    if (Object.keys(votes).includes(id)) {
      const target = Object.keys(count).filter(vote => count[vote].includes(id))[0];
      count[target].splice(count[target].indexOf(id), 1);
      if (!count[target].length) delete count[target];
    }
    votes[id] = choice;
    if (count[choice]) count[choice].push(id);
    else (count[choice]) = [id];
    //console.log('count: ', count);
    //console.log('votes: ', votes);
    socket.emit('updateCount', count);
    socket.broadcast.emit('updateCount', count);
    socket.broadcast.emit('newVote', count);
  });

});

console.log('connected to server');

 // socket.emit('connected', { message: 'hello, we are connected' })
  // socket.emit('welcome', {
  //   count4Chinese: chineseCounter,
  //   count4Japanese: japaneseCounter,
  //   count4Mexican: mexicanCounter,
  //   count4Italian: italianCounter,
  // });


  // let chineseCounter = 0;
  // let japaneseCounter = 0;
  // let mexicanCounter = 0;
  // let italianCounter = 0;
