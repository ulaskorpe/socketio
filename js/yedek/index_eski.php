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
            //  window.setInterval(function () {
            socket.send('ping from client: ' + new Date());
            // gonder = false;
            //}, 2000);
        };



        socket.onmessage = function (event) {
            //alert(event.data);
            document.getElementById('goster').value+=event.data;
        }


    </script>

</head>
<body>
<table width="100%" border="1">
    <tr>
        <td>
            <textarea name="goster" id="goster" cols="30" rows="10"></textarea>
        </td>
        <td>
            <textarea name="sonuc" id="sonuc" cols="30" rows="10"></textarea><br>

            <button id="btn1" onclick="fx()">GOSTER</button>
        </td>
    </tr>
</table>


</body>
</html>