///////////////////////////DB//////////////////////////////////////////////////////

var mysql = require('mysql');
var baglanti = mysql.createConnection({
    host : 'localhost',
    user : 'homestead',
    password : 'secret',
    database : 'ekollive_data'
});

baglanti.connect(function(err) {
    if (err) {
        console.error('ERROR : ' + err.stack);
        return;
    }else{
        console.log("DB connected");
    }
});
///////////////////////////DB//////////////////////////////////////////////////////


///////////////////////////////////server///////////////////////////


var app=require('http').createServer()
var io = require('socket.io')(app)
app.listen(4545)

console.log('socketio-mysql server created');

io.on('connection',function(socket){

   /// socket.emit('alert','hello from socketio server'+ new Date() + ":" + Math.random());

    socket.on('sendSql',function(data){
          console.log('SQL :'+data);

        baglanti.query(data, function (err, result, fields) {
            if (err){
                throw err;
            } else{
                socket.emit('alert', JSON.stringify(result[0]));
            }
            //console.log(result);
        });



        //socket.broadcast.emit('color',data);
    });

    // socket.emit('click','hello from the gutter '+new Date());



    socket.on('disconnect',function(){
        console.log('smo disconnected!');
    })


});

