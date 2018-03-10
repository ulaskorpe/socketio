<?php


include "connect.php";

$selected = $dbh->query("SELECT * FROM competitor_tmp WHERE compName='".trim($_REQUEST['selected'])."'")->fetch();
$match = $dbh->query("SELECT * FROM competitor_betradar WHERE compId='".trim($_REQUEST['matchId'])."' AND lang='".$selected['lang']."'")->fetch();


$competitor = $dbh->query("SELECT * FROM competitor WHERE compName='".$selected['compName']."' AND lang='".$selected['lang']."' LIMIT 0,1")->fetch();

if(empty($competitor['compId'])){
$competitor=$dbh->query("SELECT * FROM competitor WHERE compId='".$match['compId']."'")->fetch();
}

if(empty($competitor['compId'])){
    $sql = "INSERT INTO competitor (compId,lang,compId2,sportId,categoryId,tournamentId,compName) VALUES
              ('".$match['compId']."','".$selected['lang']."','".$match['compId2']."','".$selected['sportId']."','".$selected['categoryId']."','".$selected['tournamentId']."','".$match['compName']."')";

 ?>


<?=$selected['compName']?>  + <?=$match['compName']?>,<?=$match['compId']?>,<?=$match['compId2']?>  => competitor tablosuna yazıldı


<?php }else{

    $sql = "UPDATE competitor SET compId2='".$match['compId2']."',lang='".$selected['lang']."',categoryId='".$selected['categoryId']."',tournamentId='".$selected['tournamentId']."',compName='".$match['compName']."'
     WHERE id='".$competitor['compId']."'";
    ?>

    <?=$competitor['compName']?> competitor tablosunda güncellendi

<?php
}

echo $sql;
$dbh->query($sql);
?>
