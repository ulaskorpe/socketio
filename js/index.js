
var io = require('socket.io-client');
var socket = io.connect('http://18.194.27.128:8071', {reconnect: true});

socket.on('connect', function (socket) {
    console.log(' 18.194.27.128:8071 : Connected!');
});

///////////////////////////////////server///////////////////////////

var WebSocketServer = require('ws').Server;
var http = require('http');
var port = process.env.PORT || 4040;
var server = http.createServer();

server.listen(port);

var wss = new WebSocketServer({
   server : server
});


console.log('server started!!!');
var sonuc="";
wss.on('connection',function(ws){
    console.log('websocket connection open');

     socket.on('event', function(message) {

         var msg =JSON.stringify(message);// sonuc;//'ping from server '+new Date();
         ws.send(msg,function(){});

     });


   var id = setInterval(function () {
      var message =  sonuc;//'ping from server '+new Date();
      ws.send(message,function(){})}
      ,10000);

   ws.on('message',function(message){
       console.log(message+":::");
   });




    ws.on('close',function () {
        console.log('closed');
        clearInterval(id);
    });

});

// var express = require('express');
//
// ///app setup
//
// var app = express();
//
// var server = require('http').createServer(app);
//
// var io = require('socket.io').listen(server);
//
// users = [];
// connection = [];
//
// server.listen(process.env.PORT || 3000);
//
// app.get('/',function(req,res){
//
// });


// app.listen(4000,function(){
//     console.log('xxx');
// });


/*
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
*/