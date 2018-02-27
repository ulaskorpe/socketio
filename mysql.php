<!doctype html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>mysql</title>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
    <script>

        var socket = io('http://192.168.10.10:4545');


        socket.on('alert',function(data){
            document.getElementById('goster').value = data;
        });





    </script>
</head>
<body>



<textarea name="goster" id="goster" cols="30" rows="10"></textarea>
<input type="text" name="sonuc" id="sonuc">

</body>
</html>