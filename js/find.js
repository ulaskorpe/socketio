/////////////////////////////DB
var mysql = require('mysql2');
var baglanti = mysql.createConnection({
    host: 'localhost',
    user: 'homestead',
    password: 'secret',
    database: 'ekollive'
});
baglanti.connect(function (err) {
    if (err) {
        console.error('ERROR : ' + err.stack);
        return;
    } else {
        console.log("DB connected");
    }
});


var sportID=33;
var categoryId=34;
var leagueId=223;
var ateam="abc sports";
//baglanti.query("TRUNCATE TABLE competitor");
/*
baglanti.query("INSERT INTO competitor (lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
    "('en','11','" + sportID + "','" + categoryId + "','" + leagueId + "','0','" + ateam + "','0')",function(err,result){

    console.log(result.insertId);
} );*/

var returnData = "returnData";

function findCompatitor(compName,sportId,categoryId,leagueId,returnData ) {
    var teamId=0;
    baglanti.query("SELECT compId FROM competitor WHERE compName='"+compName+"'",function(err,result){

        if(result.length>0){
            teamId = result[0].compId;

            returnData(teamId);

        }else{
         baglanti.query("INSERT INTO competitor (lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
                "('en','11','" + sportId + "','" + categoryId + "','" + leagueId + "','0','" + compName + "','0')",function(err,result){
                teamId=result.insertId;
                returnData(teamId);
            });
        }////empty

    });

  //  console.log(teamId+"in fx");



}



var id= findCompatitor(ateam,sportID,categoryId,leagueId);
console.log("ID:"+id);
