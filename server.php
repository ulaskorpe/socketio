<?php

include "connect.php";

//var_dump($_REQUEST);

//LEFT JOIN odds AS B ON A.matchid=B.matchid LEFT JOIN oddtypes AS C ON B.oddTypeId=C.oddTypeId

$sql ="SELECT A.*,B.hteam,ateam FROM matches AS A LEFT JOIN match_competitor AS B ON A.matchid=B.matchId
  WHERE A.matchid>0";
$sportId= (!empty($_REQUEST['sportId'])) ? $_REQUEST['sportId']:4;
$sql.=" AND A.sportId=:sportId";
$sql.=" ORDER BY A.updatedAt DESC LIMIT 0,50";

$matches = $dbh->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
$matches->bindValue(':sportId', $sportId, PDO::PARAM_INT);
$matches->execute();
$matchArray = [];
$idArray = [];
foreach($matches as $match) {

$matchArray[] = ['matchid'=>$match['matchid'],'hteam'=>$match['hteam'],'ateam'=>$match['ateam'],'score'=>$match['score'],'matchtime'=>$match['matchtime'],'updatedAt'=>$match['updatedAt']];
$idArray[]= $match['matchid'];
}
/*
$implode = (count($idArray)>0)?implode($idArray,','):'0,0';
$sql = "SELECT oddtypeid,oddTypeValue FROM oddtypes AS A WHERE A.sportId=".$sportId." AND (SELECT COUNT(oddtypeid) FROM odds WHERE oddTypeId=A.oddtypeid AND matchid IN (".$implode."))>0  LIMIT 0,3";
$oddTypes=$dbh->query($sql);
$oddTypeArray = [];
foreach ($oddTypes as $oddType){
    $oddTypeArray[] =['type'=>$oddType['oddTypeValue'],'id'=>$oddType['oddtypeid']];
}*/

?>


<table border="0" cellspacing="1">


<?php
$i=0;
foreach($matchArray as $match) {
    $color = ($i%2==0)?"#f4f4f4":"#ffffff";

    ?>
<tr style="background-color: <?=$color?>">

    <td><?=$match['matchid']?></td>
    <td><?=$match['hteam']?></td>
    <td><?=$match['ateam']?></td>
    <td><?=$match['score']?></td>
    <td><?=$match['matchtime']?></td>
    <td><?=$match['updatedAt']?></td>



    <?php
    $sql = "SELECT oddtypeid,oddTypeValue FROM oddtypes AS A WHERE A.sportId=".$sportId." ORDER BY (SELECT COUNT(oddtypeid) FROM odds WHERE oddTypeId=A.oddtypeid AND  matchid='".$match['matchid']." ') DESC LIMIT 0,4";
    $oddTypes=$dbh->query($sql);
    $oddArray = [];
    foreach ($oddTypes as $oddType) {
        $odd_sql="SELECT outcome,odd,special FROM odds WHERE oddTypeId='".$oddType['oddtypeid']."' AND matchid='".$match['matchid']."' AND active=1";
        $odds = $dbh->query($odd_sql);
         ?>

    <td colspan="3" valign="top">

        <table width="100%" border="1">
            <tr><td colspan="<?=$odds->rowCount()?>" style="background-color: beige">OddType : <?=$oddType['oddTypeValue']?>  </td></tr>
            <tr>
                <?php foreach ($odds as $odd){?>
                   <td>
                       <?=$odd['outcome']?><br>
                       <?=$odd['odd']?>
                       <?php if($odd['special']>0){?>
                           [<?=$odd['special']?>]

                       <?php }?>

                   </td>
                <?php }?>

            </tr>


        </table>

    </td>

        <?php }?>


</tr>
<?php

$i++;
}
$dbh = null;
?>
</table>
