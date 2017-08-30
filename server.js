const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);

app.use(express.static(`${__dirname}/www`));
app.use(bodyParser.urlencoded({ extended: true }));

const votes = {};
const count = {};
let users = [];
let topChoices = [];
function getTopChoices() {}
// listens for connect event when users join socket
io.on('connection', (socket) => {
  // Add user to user list
  users.push(socket.id);
  // console.log(users);
  console.log('Connected: %s users', users.length);

  // remove disconnected socket from user & cancel votes
  socket.on('disconnect', () => {
    const id = socket.id;
    const choice = votes[id];
    users = users.filter(user => user !== id);
    if (count[choice]) {
      count[choice] = count[choice].filter(vote => vote.id !== id);
      if (!count[choice].length) delete count[choice];
    }

    delete votes[id];
    socket.emit('updateCount', count);
    socket.broadcast.emit('updateCount', count);
    socket.disconnect();
    console.log('Disconnected: %s users remaining', users.length);
  });

  socket.on('vote', (data) => {
    const id = socket.id;
    const choice = data[0];
    const name = data[1] || 'anonymous';

    if (Object.keys(votes).includes(id)) {
      const target = count[votes[id]].filter(voter => voter.id === id)[0];
      count[votes[id]].splice(count[votes[id]].indexOf(target), 1);
      if (!count[votes[id]].length) delete count[votes[id]];
      delete votes[id];
    }

    if (count[choice]) count[choice].push({ id, name });
    else (count[choice]) = [{ id, name }];

    votes[id] = choice;
    console.log('count: ', count);
    console.log('votes: ', votes);
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
