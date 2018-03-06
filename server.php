<?php

try {
    $dbh = new PDO('mysql:host=localhost;dbname=ekollive', 'homestead','secret');



} catch (PDOException $e) {
    print "Hata!: " . $e->getMessage() . "<br/>";
    die();
}


$sql ="SELECT A.*,B.outcome,C.oddTypeValue FROM matches AS A LEFT JOIN odds AS B ON A.matchid=B.matchid 
 LEFT JOIN oddtypes AS C ON B.oddTypeId=C.oddTypeId
 
 WHERE A.matchid>0";

if(!empty($_REQUEST['sportId'])){

    $sql.=" AND A.sportId=".$_REQUEST['sportId'];
}

$sql.=" ORDER BY A.updatedAt DESC LIMIT 0,10";

echo $sql;
?>


<table style="background-color: #fef4f4" border="1">
<?php
foreach($dbh->query($sql) as $row) {?>
<tr><td><?=$row['matchid']?></td><td><?=$row['updatedAt']?></td><td>

        <?=$row['oddTypeValue']?> : 
        <?=$row['outcome']?>

    </td></tr>
<?php }
$dbh = null;
?>
</table>
