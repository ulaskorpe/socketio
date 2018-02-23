
        //var io = require('socket.io-client');
        var socket = io.connect('http://18.194.27.128:8071', {reconnect: true});
      //  var socket = io('http://localhost:8080');

        socket.on('alert',function(data){

            document.getElementById('goster').innerHTML = data;
        });


    /*    var socket = io('54.154.164.71');
           socket.on('connect', function () {
               socket.emit('listen');
           })
           socket.on('tick', function (message) {
                console.log(message)
           });
   // var io = require('socket.io-client');
   // var socket = io.connect('http://18.194.27.128:8071', {reconnect: true});

    const io = require('socket.io-client');
    // or with import syntax
    //import io from 'socket.io-client';
      //  var socket = io('54.154.164.71');

        socket.on('tick',function(data){

            document.getElementById('goster').innerHTML = data;
        });
*/

     //   socket.emit('click', 'PING FROM CLIENT '+new Date());
