<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

</html>


<script>
     var socket = new WebSocket('ws://localhost:8080');
    //var socket = new WebSocket('wss://socketio.test:5000');
    // var socket = new WebSocket('ws://socketio.test/:5000');


     socket.onopen = function (event) {
         window.setInterval(function () {
             socket.send('ping from client: ' + new Date());
         }, 2000);

         socket.onmessage = function (event) {
             document.getElementById('goster').value=event.data;
         }

     };

</script>
    <title>SOCKET</title>
</head>
<body>

<input type="text" id="goster" style="width: 1000px;">
</body>

