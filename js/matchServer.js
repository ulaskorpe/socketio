var io = require('socket.io-client');
var socket = io.connect('http://18.194.27.128:8071', {reconnect: true});

socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.on('event', function(message) {
    console.log('--------------');
    console.log(message.matchId);
    console.log('--------------');
})