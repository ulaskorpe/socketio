<!doctype html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>mysql-2</title>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
    <script>

        var socket = io('http://192.168.10.10:4646');

        socket.on('alert',function(data){
            document.getElementById('goster').value = data;
        });


        function showFields(){
            socket.emit('showFields','');
        }

        function showData(){
            socket.emit('showData','');
        }

    </script>
</head>
<body>



<textarea name="goster" id="goster" cols="30" rows="10"></textarea>


<hr>
<button id="myBtn" onclick="showFields()">field_list</button>
<button id="myBtn" onclick="showData()">showdata</button>
</body>
</html>