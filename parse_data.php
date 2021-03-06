<!doctype html>
<html lang="tr">
<head>
    <?php
       include "connect.php";
        $sports=$dbh->query("SELECT * FROM sport ORDER BY sportName");
    ?>

    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>parse_data</title>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
    <script src="js/jquery-3.3.1.min.js"></script>

    <script>
        setInterval(getData,5000);
        function getData(){

            var link = "server.php?a=1";
            if($('#sportId').val()){
                link+="&sportId="+$('#sportId').val();
            }
            $.get( link, function( data ) {
                $( "#canliSonuclar" ).html( data );

            });
            //document.getElementById('canliSonuclar').innerHTML = Math.random(10,500)*1000;
        }


        var socket = io('http://192.168.10.10:4646');

        socket.on('alert',function(data){
            document.getElementById('goster').value += data;
        });
        socket.on('alert2',function(data){
            document.getElementById('goster2').value = data;
        });
        socket.on('alert3',function(data){
            document.getElementById('goster3').value = data;
        });




        socket.on('count',function(data){
            document.getElementById('count').value = data;
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

<table width="100%" border="1">
    <tr><td colspan="3">
            <select name="sportId" id="sportId" onchange=" getData();">

                <?php
                foreach ($sports as $sport){
                ?>
                    <option value="<?=$sport['sportId']?>" <?php if($sport['sportId']==4) {?>selected<?php }?>><?=$sport['sportName']?></option>
                <?php }?>
            </select>


            <input type="button" onclick="getData()" value="Yenile">
        </td></tr>
    <tr><td colspan="3"><div id="canliSonuclar"></div></td></tr>
    <tr>
        <td>
            <textarea name="goster" id="goster" cols="60" rows="10"></textarea>
        </td>
        <td>
            <textarea name="goster2" id="goster2" cols="60" rows="10">goster2</textarea>
        </td>
        <td>
            <textarea name="goster3" id="goster3" cols="60" rows="10"></textarea>
        </td>
    </tr>
    <tr><td colspan="3">
            <button id="myBtn" onclick="showFields()">field_list</button>
            <button id="myBtn2" onclick="showData()">showdata</button>

            <input type="number" name="count" id="count" value="0" >
        </td></tr>
</table>

</body>
</html>