<!doctype html>
<html lang="tr">
<?php include("head.php")?>
<body>



<?php


if(!empty($_REQUEST['key'])){



    $selected = $dbh->query("SELECT * FROM competitor_tmp WHERE compName='".trim($_REQUEST['key'])."' LIMIT 0,1")->fetch();

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
    <table width="100%" class="dataTable">

    <tr class="dataTableHead"><td colspan="7"><?=$_REQUEST['key']?> [<?=$selected['lang']?>] - <?=$sportName?></td></tr>
    <?php
    foreach ($dizi as $item){
        if(strlen(trim($item)) > 2){
            $item = trim($item);
            //$sql = "SELECT A.*,B.categoryName,C.tournamentName FROM competitor_betradar AS A LEFT JOIN category AS B ON A.categoryId=B.categoryId LEFT JOIN tournament AS C ON A.tournamentId=C.tournamentId WHERE  A.compName LIKE '%".$item."%'";

            $sql = "SELECT A.*,B.categoryName,C.tournamentName  FROM competitor_betradar AS A LEFT JOIN category_betradar AS B ON A.categoryId=B.categoryId 
                    LEFT JOIN tournament_betradar AS C ON A.tournamentId=C.tournamentId WHERE  A.compName LIKE '%".$item."%' AND A.lang='".$selected['lang']."'";

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
        <tr bgcolor="#f5deb3"><td colspan="7"><b><?=$item?>  ( <?=$say?> )</b></td></tr>
        <tr bgcolor="#f5f5dc"><td>CompName</td><td>compId</td><td>compId2</td><td>lang</td><td>category</td><td>league</td><td>#</td></tr>
            <?php
                $i=0;
                foreach ($competitors as $competitor){
                $color=($i%2==0)?"#ffffff":"#f4f4f4";



                ?>
                <tr bgcolor="<?=$color?>"><td><div><?=$competitor['compName']?></div></td>
                <td><?=$competitor['compId']?></td>
                <td><?=$competitor['compId2']?></td>
                <td><?=$competitor['lang']?></td>
                <td><?=$competitor['categoryName']?> <?=$competitor['categoryId']?></td>
                    <td>  <?=$competitor['tournamentName']?></td>

                <td><button onclick="matchData('<?=$selected['compName']?>','<?=$competitor['compId']?>')">EKLE</button></td>

                </tr>
            <?php
                $i++;
                }

            }
            ?>

        <?php }
    }
    ?>
</table>


<?php }///key?>
</body>
<script>

    function matchData(selected,matchId){
        var link = 'match_compatitor.php?selected='+selected+'&matchId='+matchId;
        if(confirm("<?=$selected['compName']?> seçili kayıt ile eşleştirilecek ?")){
            $.get( link, function( data ) {
                $( "#sonuclar" ).html( data );

            });
        }
    }
</script>


</html>