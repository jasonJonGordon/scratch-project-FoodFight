const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = app.listen(3000);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({ extended: true }));

// users array stores our user socket connections
const votes = [];
const count = {};

const users = [];

let chineseCounter = 0;
let japaneseCounter = 0;
let mexicanCounter = 0;
let italianCounter = 0;

// listens for connect event when users join our poll
io.on('connection', (socket) => {
  // pushes new users into our user collection (aka socket connections)
  users.push(socket);
  socket.emit('connected', { message: 'hello, we are connected' })
  socket.emit('welcome', {
    count4Chinese: chineseCounter,
    count4Japanese: japaneseCounter,
    count4Mexican: mexicanCounter,
    count4Italian: italianCounter,
  });
  console.log('Connected: %s users', users.length);
  // listens for disconnect event (when user leaves); fires only once
  socket.on('disconnect', () => {
    // remove disconnected socket from user
    users.splice(users.indexOf(socket), 1);
    // calls disconnect to make sure socket/user disconnected
    socket.disconnect();
    console.log('Disconnected: %s users remaining', users.length);
  });

  socket.on('vote', (choice) => {
    const id = socket.id;
    if (votes.includes(id)) {
      const target = Object.keys(count).filter(vote => count[vote].includes(id))[0];
      count[target].splice(count[target].indexOf(id), 1);
    } else votes.push(id);

    if (count[choice]) count[choice].push(id);
    else (count[choice]) = [id];
    console.log('count: ', count);
    console.log('votes: ', votes);
    // socket.emit('updateCount', count);
    // socket.broadcast.emit('updateCount', count);
  });

  socket.on('yesChinese', (data) => {
    console.log(data);
    if (votes.indexOf(socket.id) === -1) {
      chineseCounter += 1;
      votes.push(socket.id);
    }
    socket.emit('onReturnYesChinese', { count4Chinese: chineseCounter });
    socket.broadcast.emit('voteCountUpdateChinese', { count4Chinese: chineseCounter });

  });

  socket.on('yesJapanese', (data) => {
    if (votes.indexOf(socket.id) === -1) {
      japaneseCounter += 1;
      votes.push(socket.id);
    }
    socket.emit('onReturnYesJapanese', { count4Japanese: japaneseCounter })
    socket.broadcast.emit('voteCountUpdateJapanese', { count4Japanese: japaneseCounter }) //********
  });

  socket.on('yesMexican', (data) => {
    if (votes.indexOf(socket.id) === -1) {
      mexicanCounter += 1;
      votes.push(socket.id);
    }
    socket.emit('onReturnYesMexican', { count4Mexican: mexicanCounter })
    socket.broadcast.emit('voteCountUpdateMexican', { count4Mexican: mexicanCounter }) //********
  });

  socket.on('yesItalian', (data) => {
    if (votes.indexOf(socket.id) === -1) {
      italianCounter += 1;
      votes.push(socket.id);
    }
    socket.emit('onReturnYesItalian', { count4Italian: italianCounter })
    socket.broadcast.emit('voteCountUpdateItalian', { count4Italian: italianCounter }) //********
  });
});
// ends io.socket.on.connect

// logs when connected to server
console.log('connected to server');