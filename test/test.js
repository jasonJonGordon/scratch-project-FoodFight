var should = require('should');
var expect = require('chai').expect;
var io = require('socket.io-client'),
  server = require('../server');



var socketURL = 'http://localhost:3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
};

// var chatUser1 = {'name':'Tom'};
// var chatUser2 = {'name':'Sally'};
// var chatUser3 = {'name':'Dana'};

describe("Food Fight", function () {

  /*Can Connect to Socket*/
  it('can connect to socket', function (done) {
    var io = require('socket.io-client');
    var options = {
      transports: ['websocket'],
      'force new connection': true,
      path: '/socket.io-client'
    };
    var client = io('http://localhost:3000/');
    client.once('connect', function () {
      console.log('connected')
      client.disconnect();
      done();
    })
  })


  /*Can Vote*/

  it('should be able to vote', function (done) {
    //set up client connection
    var client = io.connect(socketURL, options);

    //Setup event listener. This is the test
    client.on('updateCount', function (count) {
      // console.log('updateCount', count)
      //console.log(Object.keys(count)[0])
      expect(Object.keys(count)[0]).to.equal('japanese')

      //Disconnect client connection
      client.disconnect();
      done();
    })

    client.on('connect', function () {
      client.emit('vote', ['japanese', 'Gordon'])

    })

  })

  /* Can receive vote */
  it('should be able to receive vote', function (done) {
    //set up client1 connection
    var client1 = io.connect(socketURL, options);

    //Setup event listener. This is the test
    client1.on('updateCount', function (count) {
      // console.log('updateCount', count)
      expect(Object.keys(count)[0]).to.equal('mexican')

      //Disconnect both client connections
      client1.disconnect();
      client2.disconnect();
      done();
    })

    client1.on('connect', function () {
      //client1.emit('vote', 'japanese')

      //Setup client2 connection
      client2 = io.connect(socketURL, options);

      client2.on('connect', function () {

        client2.emit('vote', ['mexican', 'Gordon']);

      })

    })

  })


  /* Vote removed on disconnect */
  it('Vote removed on disconnect', function (done) {
    //set up client1 connection
    var client1 = io.connect(socketURL, options);


    //Setup event listener. This is the test
    client1.on('updateCount', function (count) {
      //console.log(Object.keys(count).length === 1)
      expect(Object.keys(count).length === 1)
      expect(Object.keys(count)[0]).to.equal('japanese')

      //Disconnect both client connections
      client1.disconnect();

      done();
    })

    client1.on('connect', function () {
      //client1.emit('vote', 'japanese')

      //Setup client2 connection
      client2 = io.connect(socketURL, options);

      client2.on('connect', function () {

        client2.emit('vote', 'mexican');
        client2.disconnect();

      })

      client1.emit('vote', ['japanese', 'Gordon'])

    })

  })


  /* Can only vote once */
  it('Can only vote once', function (done) {
    //set up client1 connection
    var client1 = io.connect(socketURL, options);

    //Setup event listener. This is the test

    client1.on('updateCount', function (count) {
      setTimeout(function () {
        console.log('updateCount', count)
        expect(Object.keys(count)[0]).to.equal('hot dogs')

        //Disconnect both client connections

        client1.disconnect();
        client2.disconnect();
        done();
      }, 25)
    })


    client1.on('connect', function () {
      // client1.emit('vote', 'indonesian')

      //Setup client2 connection
      client2 = io.connect(socketURL, options);

      client2.on('connect', function () {
        client2.emit('vote', ['hamburger', 'Gordon']);
      })

      client2.on('vote', function () {
        console.log('hello')
        client2.emit('vote', ['hot dogs', 'Gordon']);
      })


    })

  })

});