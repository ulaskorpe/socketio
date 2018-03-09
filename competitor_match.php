<!doctype html>
<html lang="en">
<head>
    <?php
    include("connect.php");
  //  var_dump($_REQUEST);


    $sports = $dbh->query("SELECT A.*,B.betradarId FROM sport AS A LEFT JOIN sportIndex AS B ON A.sportId=B.sportId ORDER BY A.sportName");

    $sql = "SELECT A.*,B.compName as recordName,C.betradarId FROM competitor_tmp AS A LEFT  JOIN  competitor AS B ON A.compName=B.compName LEFT JOIN sportIndex AS C ON A.sportId=C.sportId WHERE A.compName<>'' ";

    if(!empty($_REQUEST['key'])){
        $key =trim($_REQUEST['key']);
        $sql.=" AND A.compName LIKE '%".$key."%' ";
    }else{
        $key="";
    }


    if(!empty($_REQUEST['sportid']) && $_REQUEST['sportid']!='all'){
        $sportId =trim($_REQUEST['sportid']);
       // $sql.=" AND A.sportId= (SELECT sportId FROM sportIndex WHERE betradarId='".$sportId."')  ";
        $sql.=" AND C.betradarId=".$sportId." ";
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

//echo $sql;

    $competitors = $dbh->prepare($sql,array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
    $competitors->execute();
    ?>

    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>match competitors</title>
    <script src="js/jquery-3.3.1.min.js"></script>

    <script>

        function getData(key,sportId){

            var link = "find_competitor.php?a=1";
            if(key!=''){
                link+="&key="+key;
            }

            if(sportId!=''){
                link+="&sportId="+sportId;
            }


            $.get( link, function( data ) {
                $( "#sonuclar" ).html( data );

            });
            //document.getElementById('canliSonuclar').innerHTML = Math.random(10,500)*1000;
        }
    </script>

    <style>

        a{
            color:#880000;
            text-decoration: none;
            font-size: 17px;
        }

        a:hover {
            color : red;
        }
    </style>

</head>
<body>
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
                        <option value="<?=$sport['betradarId']?>" <?php if($sportId == $sport['betradarId']){?>selected<?php }?>><?=$sport['sportName']?>  </option>
                    <?php }?>
                </select>


                <input type="submit" value="ARA"></td></tr>

    </form>
<tr>
    <td width="40%" valign="top">
        <table>
        <?php foreach ($competitors as $competitor){?>
            <tr><td>
            <div class="competitor">
                <?php
                 if(strpos($competitor['compName'],'/')){
                     $dizi = explode("/",$competitor['compName']);
                     foreach ($dizi as $item) {?>
                         <a href="#" onclick="getData('<?=$item?>','<?=$competitor['betradarId']?>')"><?=$item?></a> |
                     <?php }?>

                <?php }else{?>
                     <a href="#" onclick="getData('<?=$competitor['compName']?>','<?=$competitor['betradarId']?>' )"><?=$competitor['compName']?></a>
                <?php }?>
            </div>
                </td>
            <td>

                MATCHES : <?=$competitor['recordName']?>
            </td>
            </tr>

        <?php }?>
        </table>
    </td>

    <td width="60%"  valign="top">
        <div id="sonuclar"></div>

    </td>

</tr>

</table>

</body>
</html>





