
var io = require('socket.io-client');
var socket = io.connect('http://18.194.27.128:8071', {reconnect: true});

socket.on('connect', function (socket) {
    console.log(' 18.194.27.128:8071 : Connected!');
});

///////////////////////////DB//////////////////////////////////////////////////////

var mysql = require('mysql');
var baglanti = mysql.createConnection({
    host : 'localhost',
    user : 'homestead',
    password : 'secret',
    database : 'ekollive'
});

baglanti.connect(function(err) {
    if (err) {
        console.error('ERROR : ' + err.stack);
        return;
    }
});

/*baglanti.query("select * from tmp order by id desc limit 0,10",function(err,result){

    if(err){
        console.log(err);
    }else{
        console.log(result[0]['id']);
    }

});*/



///////////////////////////DB//////////////////////////////////////////////////////


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

wss.on('connection',function(ws){
    console.log('websocket connection open');

     socket.on('event', function(message) {

         var msg =JSON.stringify(message.cards);// sonuc;//'ping from server '+new Date();
            var matchID  = 0;

        baglanti.query("SELECT title FROM tmp WHERE title='"+message.matchId+"' LIMIT 0,1",function(err,result){

               matchID = parseInt(result[0]['title']);


        });

        if(matchID>0){
           baglanti.query("UPDATE tmp SET data = '"+msg+"' WHERE title='"+matchID+"'");
            console.log(matchID+" UPDATED");

        }else{
         baglanti.query('INSERT INTO tmp (title,data,type) VALUES (\''+message.matchId+'\',\''+msg+'\',\'1\')');
            console.log(matchID+" INSERTED");
        }

         ws.send(msg,function(){});

     });




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