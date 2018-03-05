///////betresults///////////////////////////////////
data.betResaults.forEach(function(result){

    var typeId=general_helper.isNull(general_helper.escapeHtml(JSON.stringify(result.typeId)));
    var typeName=general_helper.isNull(general_helper.escapeHtml(JSON.stringify(result.typeName)));
    var winId= general_helper.isNull(general_helper.escapeHtml(JSON.stringify(result.winId)));
    var win=general_helper.isNull(general_helper.escapeHtml(JSON.stringify(result.win)));
    var outComeId=general_helper.isNull(general_helper.escapeHtml(JSON.stringify(result.outComeId)));
    var special=general_helper.isNull(general_helper.escapeHtml(JSON.stringify(result.special)));
    sql = "INSERT INTO betResults (matchId,typeId,typeName,winId,win,outComeId,special) VALUES "+
        "('"+matchID+"','"+typeId+"','"+typeName+"','"+winId+"','"+win+"','"+outComeId+"','"+special+"')" +
        "ON DUPLICATE KEY UPDATE typeName='"+typeName+"',win='"+win+"',outComeId='"+outComeId+"',special='"+special+"',updatedAt=NOW()";
    ///   console.log(sql);
    // baglanti.query(sql);
});
///////betresults///////////////////////////////////
///////////////////////ODDTYPES-ODDS/////////////////////////////////////////////////////
var sql = "";
var active =0;
var oddvalue="";
var outcome = "";
data.odds.forEach(function (item) {

    /*
    *  "oddsId":251577464,   //// odds.oddid PK
   "oddsType":62, /// oddtypeid --- PK
   "special":"",
   "active":true,
   "typeName":"Match Winner", //// type varchar
            * */

    typeName = general_helper.escapeHtml(JSON.stringify(item.typeName));
    baglanti.query("INSERT INTO oddtypes (oddtypeid,oddtypevalue,sportid) VALUES ('"+item.oddsType+"','"+typeName+"','"+sportID+"')" +
        "ON DUPLICATE KEY UPDATE oddtypevalue='"+typeName+"',updatedAt=NOW()");

    var oddtypeid= item.oddsType;
    var oddsId= item.oddsId;
    var special= item.special;

    item.odds.forEach(function (odd){

        /*
       "id":776385386,
       "outComeId":"",
       "active":true,
       "outCome":"Roberto Bautista-Agut (ESP)",
       "odds":1.2
       */
        oddvalue =general_helper.escapeHtml(JSON.stringify(odd.odds));
        outcome =  general_helper.escapeHtml(JSON.stringify(odd.outCome));
        active = (item.active) ?1:0;

        sql =  "INSERT INTO odds (oddid,outcomeOddId,matchid,oddFieldTypeId,oddTypeId,special,active,odd,outcome) VALUES " +
            "('"+oddsId+"','"+odd.id+"','"+matchID+"','"+odd.id+"','"+oddtypeid+"','"+special+"','"+active+"','"+oddvalue+"','"+outcome+"')" +
            " ON DUPLICATE KEY UPDATE  odd='"+oddvalue+"',active='"+active+"',updatedAt=NOW()";
        try {

            baglanti.query(sql);
        }catch (err){
            socket.emit('alert2', sql+":"+err);
            console.log(err);

        }




    });////odds.odd

}); ///odds
///////////////////////ODDTYPES-ODDS/////////////////////////////////////////////////////