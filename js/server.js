var app=require('http').createServer();
var io = require('socket.io')(app);

app.listen(8080);

io.on('connection',function(socket){

    console.log('connected!!');

    setInterval(function () {
            socket.emit('alert','server.js : '+new Date());
        }
        ,1000);


    socket.on('click',function(data){
        console.log(data);
    });

   // socket.emit('click','hello from the gutter '+new Date());

    socket.on('disconnect',function(){
        console.log('smo disconnected!');
    })
});
