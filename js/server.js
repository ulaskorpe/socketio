/////socketio ile server/////////////



var app=require('http').createServer()
var io = require('socket.io')(app)

app.listen(5050)

console.log('socketio server created');

io.on('connection',function(socket){


    socket.emit('alert','hello from socketio server'+ new Date());
/*
    socket.on('click',function(data){
        console.log(data);
    });

    // socket.emit('click','hello from the gutter '+new Date());

    socket.on('disconnect',function(){
        console.log('smo disconnected!');
    })*/
});