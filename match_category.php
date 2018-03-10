<?php
//var_dump($_REQUEST);

include "connect.php";
$selected = $dbh->query("SELECT * FROM category WHERE categoryId=".$_REQUEST['selectedId'])->fetch();
//echo "SELECT * FROM category_betradar WHERE categoryId=".$_REQUEST['matchId'];
$matched = $dbh->query("SELECT * FROM category_betradar WHERE lang='".$selected['lang']."' AND categoryId=".$_REQUEST['matchId'])->fetch();
$sql = "UPDATE category SET betradarId='".$_REQUEST['matchId']."' WHERE categoryId='".$_REQUEST['selectedId']."'";
$dbh->query($sql);

?>

<?=$selected['categoryName']?>  -->  <?=$matched['categoryName']?> ile eşleştirildi
