/////socketio ile server/////////////



var app=require('http').createServer()
var io = require('socket.io')(app)

app.listen(5050)

console.log('socketio server created');

io.on('connection',function(socket){


    socket.emit('alert','hello from socketio server'+ new Date() + ":" + Math.random());

    socket.on('color',function(data){
    //   console.log('color server.js'+data);
        socket.broadcast.emit('color',data);
    });

    // socket.emit('click','hello from the gutter '+new Date());



    socket.on('disconnect',function(){
        console.log('smo disconnected!');
    })


});