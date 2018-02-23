var express = require('express');
//app
var app = express();

var server = app.listen(3030,function(){

    console.log('listening 3030');
});


app.use(express.static('public'))