<!doctype html>
<html lang="tr">
<?php include("head.php")?>
<body>

<?php
$sports = $dbh->query("SELECT A.*,B.betradarId FROM sport AS A LEFT JOIN sportIndex AS B ON A.sportId=B.sportId ORDER BY A.sportName");

$sql = "SELECT A.* FROM category AS A WHERE A.betradarId=0";

if(!empty($_REQUEST['key'])){
    $key =trim($_REQUEST['key']);
    $sql.=" AND A.categoryName LIKE '%".$key."%' ";
}else{
    $key="";
}
if(!empty($_REQUEST['sportid']) && $_REQUEST['sportid']!='all'){
    $sportId =trim($_REQUEST['sportid']);
    // $sql.=" AND A.sportId= (SELECT sportId FROM sportIndex WHERE betradarId='".$sportId."')  ";
    $sql.=" AND A.sportId=".$sportId." ";
}else{
    $sportId="";
}

if(!empty($_REQUEST['limit']) && $_REQUEST['limit']!='all'){
    $limit = $_REQUEST['limit'];
    $sql .= "ORDER BY A.compName LIMIT 0,".$limit;
}else{
    $limit='all';
    $sql .= "ORDER BY A.compName";
}



?>
<table width="100%">
    <tr><td colspan="2"><?php include("menu.php")?></td></tr>
    <form action="#" method="post">
        <tr><td><input type="text" name="key" id="key" value="<?=$key?>">

                <select name="limit" id="limit" onchange="submit();">
                    <option value="all" <?php if($limit == 'all'){?>selected<?php }?>>Tamamı</option>

                    <?php for($i=10;$i<250;$i+=25){?>
                        <option value="<?=$i?>" <?php if($limit == $i){?>selected<?php }?>><?=$i?></option>
                    <?php }?>
                </select>

                <select name="sportid" id="sportid" onchange="submit();">
                    <option value="all" <?php if($sportId == 'all'){?>selected<?php }?>>Tamamı</option>

                    <?php foreach ($sports as $sport){?>
                        <option value="<?=$sport['sportId']?>" <?php if($sportId == $sport['sportId']){?>selected<?php }?>><?=$sport['sportName']?>  </option>
                    <?php }?>
                </select>


                <input type="submit" value="ARA"></td></tr>

    </form>

</table>
</body>
</html>