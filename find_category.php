<!doctype html>
<html lang="tr">
<?php include("head.php")?>
<body>

<?php

$selected = $dbh->query("SELECT * FROM category WHERE categoryId=".$_REQUEST['categoryId'])->fetch();

$keyArray = explode(' ',trim($selected['categoryName']));
$count = count($keyArray);
//

$sql = "SELECT A.*,C.sportName FROM category_betradar AS A LEFT JOIN sportIndex AS B ON A.sportId=B.betradarId LEFT JOIN sport AS C ON B.sportId=C.sportId   WHERE (";

$i=0;
$notValid = ['and'];
$search = "";
foreach ($keyArray as $key){

    if(strlen($key) >2 && !in_array($key,$notValid) ){
    $sql.="  A.categoryName LIKE '%".$key."%'";
    $search.=$key;
    if($i<$count-1){
        $sql.=" OR ";
        $search.=",";
    }else{
        $sql.=" )";
    }


    }
    $i++;
}

#echo $sql;



$matches = $dbh->query($sql);
$i=0;
?>
<table width="100%" class="dataTable">
<tr class="dataTableHead"><td colspan="5">Aranan : <?=$search?></td></tr>

<tr bgcolor="#f5f5dc"><td>CategoryName</td><td>Lang</td><td>CategoryId</td><td>SportName-SportId</td><td>#</td></tr>
<?php foreach ($matches as $match){
    $color = ($i%2!=0)?"#f4f4f4":"#ffffff";
    ?>

<tr bgcolor="<?=$color?>">
    <td><?=$match['categoryName']?></td>
    <td><?=$match['lang']?></td>
    <td><?=$match['categoryId']?></td>
    <td><?=$match['sportName']?> - <?=$match['sportId']?></td>
    <td><button onclick="matchData('<?=$selected['categoryId']?>','<?=$match['categoryId']?>')">MATCH</button></td>

</tr>
<?php
$i++;
}?>

</table>
</body>
<script>
    function matchData(selectedId,matchId){

        if(confirm('<?=$selected['categoryName']?> seçili kayıt ile güncellenecek ?')){
           // alert(selectedId+matchId);
            var link='match_category.php?selectedId='+selectedId+'&matchId='+matchId;
            $.get( link, function( data ) {
                $( "#sonuclar" ).html( data );
            });

        }

    }

</script>

</html>