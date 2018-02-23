<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>54.154.164.71</title>

    <script>

        var socket = new WebSocket('ws://localhost:4040');
        //var socket = new WebSocket('wss://socketio.test:5000');
        // var socket = new WebSocket('ws://socketio.test/:5000');


        socket.onopen = function (event) {
             window.setInterval(function () {
                socket.send('ping from client: ' + new Date());
            }, 2000);
        };



            socket.onmessage = function (event) {
                //alert(event.data);
                document.getElementById('goster').value=event.data;
            }


    </script>

</head>
<body>
<textarea name="goster" id="goster" cols="30" rows="10"></textarea>

</body>
</html>