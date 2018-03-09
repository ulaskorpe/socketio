<!doctype html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title>Document</title>
</head>
<body>



<?php
header('Content-Type: text/html; charset=utf-8');

if(!empty($_REQUEST['key'])){

    include "connect.php";
        $sportName="";

    if(!empty($_REQUEST['sportId'])){
        $sql =  "SELECT A.* FROM sport AS A LEFT JOIN sportIndex AS B ON A.sportId=B.sportId WHERE B.betradarId='".$_REQUEST['sportId']."' LIMIT 1";
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $sport = $stmt->fetch();
        $sportName=$sport['sportName'];
    }

   $dizi = explode(' ' ,$_REQUEST['key']);

?>
<table>

    <tr><td colspan="5"><?=$_REQUEST['key']?> - <?=$sportName?></td></tr>
    <?php
    foreach ($dizi as $item){
        if(strlen(trim($item)) > 2){
            $item = trim($item);
            //$sql = "SELECT A.*,B.categoryName,C.tournamentName FROM competitor_betradar AS A LEFT JOIN category AS B ON A.categoryId=B.categoryId LEFT JOIN tournament AS C ON A.tournamentId=C.tournamentId WHERE  A.compName LIKE '%".$item."%'";
            $sql = "SELECT A.*,B.categoryName,C.tournamentName  FROM competitor_betradar AS A LEFT JOIN category AS B ON A.categoryId=B.categoryId 
                    LEFT JOIN tournament_betradar AS C ON A.tournamentId=C.tournamentId WHERE  A.compName LIKE '%".$item."%'  ";

            if(!empty($_REQUEST['sportId'])){
                $sql.=" AND A.sportId=".$_REQUEST['sportId'];
            }

                $limit='all';
                $sql .= " ORDER BY A.compName";


            $competitors = $dbh->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
            $competitors->execute();
/*
 * <td><?=$competitor['tournamentId']?> | <?=$competitor['tournamentName']?></td>
 * */
$say = $competitors->rowCount();
            if($say){
            ?>
        <tr><td colspan="7"><b><?=$item?>  ( <?=$say?> )</b></td></tr>
        <tr><td>CompName</td><td>compId</td><td>compId2</td><td>lang</td><td>category</td><td>league</td><td>#</td></tr>
            <?php foreach ($competitors as $competitor){?>
                <tr><td><div><?=$competitor['compName']?></div></td>
                <td><?=$competitor['compId']?></td>
                <td><?=$competitor['compId2']?></td>
                <td><?=$competitor['lang']?></td>
                <td><?=$competitor['categoryName']?></td>
                    <td>  <?=$competitor['tournamentName']?></td>

                <td><button onclick="addData('')">EKLE</button></td>

                </tr>
            <?php }

            }
            ?>

        <?php }
    }
    ?>
</table>


<?php }///key?>
</body>
</html>