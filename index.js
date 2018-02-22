
var express = require('express');

///app setup

var app = express();

var server = app.listen(4000,function(){
    console.log('xxx');
});


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