<!doctype html>
<html lang="tr">
<?php include("head.php")?>
<body>

<?php
$sports = $dbh->query("SELECT A.*,B.betradarId FROM sport AS A LEFT JOIN sportIndex AS B ON A.sportId=B.sportId ORDER BY A.sportName");

$sql = "SELECT A.*,C.sportName FROM category AS A LEFT JOIN sportIndex AS B ON A.sportId=B.betradarId LEFT JOIN sport AS C ON B.sportId=C.sportId WHERE A.categoryId>0";


if(!empty($_REQUEST['matched'])){
    $matched=$_REQUEST['matched'];
    if($matched==2){ ///eşleşmiş veri
            $sql .=" AND A.betradarId>0";
    }else{ /// eşleşmemiş veri
        $sql .=" AND A.betradarId=0";
    }

}else{
    $matched=1;
}

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
    $sql .= " ORDER BY A.categoryName LIMIT 0,".$limit;
}else{
    $limit='all';
    $sql .= " ORDER BY A.categoryName";
}
//echo $sql;
$i=0;
$categories = $dbh->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
$categories->execute();



?>
<table width="100%">

    <tr><td colspan="2"><?php include("menu.php")?></td></tr>
    <form action="#" method="post">
        <tr><td><input type="text" name="key" id="key" value="<?=$key?>">

                <select name="matched" id="matched" onchange="submit();">
                    <option value="1" <?php if($matched == 1){?> selected <?php }?>>Tamamı</option>
                    <option value="2" <?php if($matched == 2){?> selected <?php }?>>Eşleşmiş Veri</option>
                    <option value="3" <?php if($matched == 3){?> selected <?php }?>>Eşleşmemiş Veri</option>

                </select>

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

    <tr><td width="30%" valign="top">
     <table width="100%">
       <?php foreach($categories as $category){
        $color=($i%2==0)?"#ffffff":"#f4f4f4";
        ?>
        <tr bgcolor="<?=$color?>">
            <td> <a href="#" onclick="getData('<?=$category['categoryId']?>')"><?=$category['categoryName']?></a></td>
            <td><?=$category['sportName']?></td>
        </tr>
    <?php
    $i++;
    }?>
    </table>

    </td>

    <td width="70%" valign="top"><div id="sonuclar"></div></td>
    </tr>

</table>
</body>

<script>

    function getData(categoryId){

        var link = "find_category.php?a=1";
        if(categoryId!=''){
            link+="&categoryId="+categoryId;
        }

        $.get( link, function( data ) {
            $( "#sonuclar" ).html( data );
        });
        //document.getElementById('canliSonuclar').innerHTML = Math.random(10,500)*1000;
    }
</script>
</html>