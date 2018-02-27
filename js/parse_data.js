function escapeHtml(unsafe) {
    return unsafe
    /*    .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");*/
        .replace(/'/g, "");
}

var io = require('socket.io-client');
var socket_remote = io.connect('http://18.194.27.128:8071', {reconnect: true});

socket_remote.on('connect', function (socket) {
    console.log(' 18.194.27.128:8071 : Connected!');
});


/////////////////////////////DB
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
    }else{
        console.log("DB connected");
    }
});

///////////////////////////////////server///////////////////////////
var app=require('http').createServer()
var io = require('socket.io')(app)
app.listen(4646)
console.log('socketio-mysql2 server created');
var selectedId = 0;
io.on('connection',function(socket){
  baglanti.query("TRUNCATE TABLE matches");
    console.log("smo connected");
    //socket.emit('alert', sonuc)
    var i=0;
    socket_remote.on('event', function (data) {

        var matchID=JSON.stringify(data.matchId);
        var sportID = escapeHtml(JSON.stringify(data.sportId));
        var matchTime =escapeHtml(JSON.stringify(data.matchTime));
        var selectedId = 0;

        console.log(data);

        var sql = "SELECT matchid FROM `matches` where matchid='"+matchID+"' LIMIT 0,1";
        baglanti.query(sql,function(err, results, fields) {
            if(err){
                console.log(err);
            }else{///noerrr
                results.forEach(function(item){
                  // console.log(item);
                    selectedId=parseInt(item['matchid']) ;
                    //  sonuc+=JSON.stringify(t['name'])+"=>"+JSON.stringify(item[t['name']])+"|\n";

                });
                //data =  escapeHtml(JSON.stringify(data));


                if(selectedId>0){
                 ///   console.log(selectedId+":"+matchID+":UPDATE");
                    baglanti.query("UPDATE matches SET sportid='"+sportID+"',matchTime='"+matchTime+"' WHERE matchid='"+selectedId+"'");
                    socket.emit('alert2', selectedId+" UPDATED " );
                }else{
               //     console.log(selectedId+":"+matchID+":INSERT");

                    baglanti.query("INSERT INTO matches (matchid,sportid,matchtime) VALUES ('"+matchID+"','"+sportID+"','"+matchTime+"')");
                    socket.emit('alert2', matchID+" INSERTED " );
                }

            }//noerrr
        } );


        i++;

    }); /// remote_event

    socket.on('showFields',function(){

        socket.emit('alert', 'showfields');
    });

    socket.on('showData',function(){

        socket.emit('alert', 'showdata');
    });






    socket.on('disconnect',function(){
        console.log('smo disconnected!');
    })


});