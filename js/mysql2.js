// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user : 'homestead',
    password : 'secret',
    database : 'ekollive'
});

// simple query
var sonuc="";
var field_list = "";
connection.query(
    'SELECT * FROM `oddfieldtypes` where oddtypeid<10',
    function(err, results, fields) {

        results.forEach(function(item){
            //console.log(item['type']);
            fields.forEach(function (t) {
                sonuc+=JSON.stringify(t['name'])+"=>"+JSON.stringify(item[t['name']])+"|\n";
            });
            sonuc+="\n";
        });
        fields.forEach(function (t) {
            field_list+=JSON.stringify(t['name'])+"|";

        });

//        socket.emit('alert', sonuc);

       //console.log(results['type']); // results contains rows returned by server
      //  console.log(fields); // fields contains extra meta data about results, if available
    }
);


///////////////////////////////////server///////////////////////////


var app=require('http').createServer()
var io = require('socket.io')(app)
app.listen(4646)

console.log('socketio-mysql2 server created');

io.on('connection',function(socket){

    //socket.emit('alert', sonuc);

    socket.on('showFields',function(){

        socket.emit('alert', field_list);
    });

    socket.on('showData',function(){

        socket.emit('alert', sonuc);
    });



    socket.on('disconnect',function(){
        console.log('smo disconnected!');
    })


});
