//var general_helper = require('general_helper');
const general_helper = require('./general_helper');

var io_remote = require('socket.io-client');
var socket_remote = io_remote.connect('http://18.194.27.128:8071', {reconnect: true});

socket_remote.on('connect', function (socket) {
    console.log(' 18.194.27.128:8071 : Connected!');
});

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


function findCompatitor(compName,sportId,categoryId,leagueId) {
    var teamId=0;
    baglanti.query("SELECT compId FROM competitor WHERE compName='"+compName+"' LIMIT 0,1",function(err,result){
        if(result.length>0){

            teamId = result[0].compId;

        }else{

            baglanti.query("INSERT INTO competitor (lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
                "('en','11','" + sportId + "','" + categoryId + "','" + leagueId + "','0','" + compName + "','0')",function(err,result){
                teamId=result.insertId;

            });
        }////empty

    });

   return teamId;

}

///////////////////////////////////server///////////////////////////
var app = require('http').createServer();
var io = require('socket.io')(app);
app.listen(4646);
console.log('socketio-mysql2 server created');

io.on('connection', function (socket) {
   // baglanti.query("TRUNCATE TABLE matches");
  //  baglanti.query("TRUNCATE TABLE tmp");
    console.log("smo connected");
    var i = 0;
    var basket = 0;
    var typeName ="";
    var say = 0;
    var extraData = "";
    var count = 0;
    var takimSay=0;

    var oddtypeid= '';
    var oddsId= '';
    var specialvalue='';
    var score ='';
    var scoreHome = '';
    var scoreAway='';
    var matchStatus = '';
    var betStatus = '';
    var matchID = 0;

    //   console.log(matchID);
    var sportID =  0;
    var categoryId =0;
    var categoryName = '';
    var leagueId = 0;
    var leagueName = '';
    var sportName = '';
    var matchTime ='';
    var hteam = '';
    var ateam = '';
    var yellowcardsaway = 0;
    var yellowcardshome =0;
    var redcardsaway = 0;
    var redcardshome = 0;
    var cornersaway = 0;
    var cornershome = 0;
    var yellowredcardsaway = 0;///güncellenecek
    var yellowredcardshome = 0;///güncellenecek
    var sql ='';
    var outcomeId =0;
    var hteamId = 0;
    var ateamId = 0;
    var data = '';
    var type_active=0;
    var active=0;
    var outcomeOddId=0;
    socket_remote.on('event', function (data) {

        var extra =[];
        try {
            matchID = JSON.stringify(data.matchId);
            socket.emit('count',say);
            say++;
            //// console.log(matchID+"basla");
            sportID =  JSON.stringify(data.sportId);
            categoryId = general_helper.escapeHtml(JSON.stringify(data.countryId));
            categoryName = general_helper.escapeHtml(JSON.stringify(data.countryName));
            leagueId = general_helper.escapeHtml(JSON.stringify(data.leagueId));
            leagueName =  general_helper.escapeHtml(JSON.stringify(data.leagueName));
            sportName = general_helper.escapeHtml(JSON.stringify(data.sportName));
            matchTime = general_helper.escapeHtml(JSON.stringify(data.matchTime));
            hteam = general_helper.escapeHtml(JSON.stringify(data.hteam));
            ateam = general_helper.escapeHtml(JSON.stringify(data.ateam));
            hteamId = general_helper.escapeHtml(JSON.stringify(data.hteamId));
            ateamId = general_helper.escapeHtml(JSON.stringify(data.ateamId));


            if(matchID && sportID && categoryId){

                baglanti.query("insert into `sport` (sportId,lang,sportName,minTip,status,liveStatus,locks,listOrder)   Values ('" + sportID + "','en','" + sportName + "','1','1','1','0','1')" +
                    " on duplicate key update sportName='" + sportName + "'");
                baglanti.query("INSERT INTO category (sportId,categoryId,lang,categoryName,listOrder,minTip,status,liveStatus,locks) VALUES" +
                    "('" + sportID + "','" + categoryId + "','en','" + categoryName + "','1','1','1','1','0')" +
                    " ON duplicate KEY UPDATE categoryName='" + categoryName + "',sportId='" + sportID + "'");
                baglanti.query("INSERT INTO tournament (sportId,categoryId,tournamentId,lang,tournamentName,minTip,oddsLock,listOrder,status,liveStatus,locks)" +
                    " VALUES ('" + sportID + "','" + categoryId + "','" + leagueId + "','en','" + leagueName + "','1','0','1','1','1','0') ON DUPLICATE KEY UPDATE sportId='" + sportID + "' , categoryId='" + categoryId + "',tournamentName='" + leagueName + "'");

                if(parseInt(hteamId) >0  ){

                    baglanti.query("INSERT INTO competitor (compId,lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
                                "('"+hteamId+"','en','11','" + sportID + "','" + categoryId + "','" + leagueId + "','0','" + hteam + "','0') ON DUPLICATE KEY UPDATE compName='"+hteam+"',tournamentId='"+leagueId+"'");
                }else{
                    baglanti.query("INSERT INTO competitor_tmp (lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
                        "('en','"+hteamId+"','" + sportID + "','" + categoryId + "','" + leagueId + "','0','" + hteam + "','0') ON DUPLICATE KEY UPDATE tournamentId='"+leagueId+"'");
                }

                if(parseInt(ateamId)>0 ){
                    baglanti.query("INSERT INTO competitor (compId,lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
                        "('"+hteamId+"','en','11','" + sportID + "','" + categoryId + "','" + leagueId + "','0','" + ateam + "','0') ON DUPLICATE KEY UPDATE compName='"+ateam+"',tournamentId='"+leagueId+"'");
                }else{
                    baglanti.query("INSERT INTO competitor_tmp (lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
                        "('en','"+ateamId+"','" + sportID + "','" + categoryId + "','" + leagueId + "','0','" + ateam + "','0') ON DUPLICATE KEY UPDATE tournamentId='"+leagueId+"'");
                }
                baglanti.query("INSERT INTO match_competitor (matchId,hteam,ateam) VALUES ('"+matchID+"','"+hteam+"','"+ateam+"') ON DUPLICATE KEY UPDATE hteam='"+hteam+"',ateam='"+ateam+"'");
                matchStatus = general_helper.escapeHtml(JSON.stringify(data.matchStatus));
                betStatus = general_helper.escapeHtml(JSON.stringify(data.betStatus));

                //   var scoreHome = (general_helper.isEmpty(data.score.matchScore.scoreHome)) ? general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreHome)):0;// (data.score.matchScore.scoreHome!=null)? general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreHome)) : 0;
                //   var scoreAway = (general_helper.isEmpty(data.score.matchScore.scoreAway)) ? general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreAway)) :0;// (data.score.matchScore.scoreAway!=null)? general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreAway)) : 0;


               scoreHome =  (general_helper.isEmpty(JSON.stringify(data.score.matchScore)))?0:JSON.stringify(data.score.matchScore.scoreHome);
               scoreAway =  (general_helper.isEmpty(JSON.stringify(data.score.matchScore)))?0:JSON.stringify(data.score.matchScore.scoreAway);

               scoreHome = (scoreHome == undefined) ? 0 : scoreHome;
               scoreAway = (scoreAway ==undefined) ? 0 : scoreAway;
               score = scoreHome+ ":" + scoreAway;




                if (sportID == 4) {////football



                     yellowcardsaway = general_helper.findInt(data.cards.yellowCards.Away1StHalf) + general_helper.findInt(data.cards.yellowCards.Away2StHalf) + general_helper.findInt(data.cards.yellowCards.Away3StHalf) + general_helper.findInt(data.cards.yellowCards.Away4StHalf);
                     yellowcardshome = general_helper.findInt(data.cards.yellowCards.Home1StHalf) + general_helper.findInt(data.cards.yellowCards.Home2StHalf) + general_helper.findInt(data.cards.yellowCards.Home3StHalf) + general_helper.findInt(data.cards.yellowCards.Home4StHalf);
                     redcardsaway = general_helper.findInt(data.cards.redCards.Home1StHalf) + general_helper.findInt(data.cards.redCards.Home2StHalf) + general_helper.findInt(data.cards.redCards.Home3StHalf) + general_helper.findInt(data.cards.redCards.Home4StHalf);
                     redcardshome = general_helper.findInt(data.cards.redCards.Home1StHalf) + general_helper.findInt(data.cards.redCards.Home2StHalf) + general_helper.findInt(data.cards.redCards.Home3StHalf) + general_helper.findInt(data.cards.redCards.Home4StHalf);
                     cornersaway = general_helper.findInt(data.corners.Away1StHalf) + general_helper.findInt(data.corners.Away2StHalf) + general_helper.findInt(data.corners.Away3StHalf) + general_helper.findInt(data.corners.Away4StHalf);
                     cornershome = general_helper.findInt(data.corners.Home1StHalf) + general_helper.findInt(data.corners.Home2StHalf) + general_helper.findInt(data.corners.Home3StHalf) + general_helper.findInt(data.corners.Home4StHalf);
                     yellowredcardsaway = 0;///güncellenecek
                     yellowredcardshome = 0;///güncellenecek
                    // baglanti.query("INSERT INTO tmp (title,data,type) VALUES ('"+matchID+"','"+JSON.stringify(data.cards.yellowCards)+"','15')");
                    try {


                        ///console.log(hteamId+":"+ateamId);
                        baglanti.query("INSERT INTO matches " +
                            "(matchid,team1,team2,sportid,matchtime,betradarid,active,matchStatus,betStatus,score,yellowredcardsaway,yellowredcardshome,redcardsaway,redcardshome," +
                            "yellowcardsaway,yellowcardshome,cornersaway,cornershome,categoryid,tournamentid) " +
                            "VALUES " +
                            "('" + matchID + "','"+hteamId+"','"+ateamId+"','" + sportID + "','" + matchTime + "','" + data.betradarId + "','" + data.active + "','" + matchStatus + "','" + betStatus + "','" + score + "','" + yellowredcardsaway + "'," +
                            "'" + yellowredcardshome + "','" + redcardsaway + "'," +
                            "'" + redcardshome + "','" + yellowcardsaway + "','" + yellowcardshome + "','" + cornersaway + "','" + cornershome + "','"+categoryId+"','"+leagueId+"')" +
                            " ON DUPLICATE KEY UPDATE sportId='" + sportID + "',matchtime='" + matchTime + "',betradarid='" + data.betradarId + "',active='" + data.active + "',matchStatus='" + matchStatus + "'," +
                            "betStatus='" + betStatus + "',score='" + score + "',yellowredcardsaway='" + yellowredcardsaway + "',yellowredcardshome='" + yellowredcardshome + "'," +
                            "redcardsaway='" + redcardsaway + "',redcardshome='" + redcardshome + "',yellowcardsaway='" + yellowcardsaway + "',yellowcardshome='" + yellowcardshome + "',cornersaway='" + cornersaway + "'," +
                            "cornershome='" + cornershome + "',updatedAt=NOW()");

                    }catch (err){}

                extra = ['cards','corners','penalties'];


                  //  console.log("futbol"+JSON.stringify(data));



                }else{///!football


                     baglanti.query("INSERT INTO matches " +
                         "(matchid,team1,team2,sportid,matchtime,betradarid,active,matchStatus,betStatus,score,categoryid,tournamentid) " +
                         "VALUES " +
                         "('" + matchID + "','"+hteamId+"','"+ateamId+"','" + sportID + "','" + matchTime + "','" + data.betradarId + "','" + data.active + "','" + matchStatus + "','" + betStatus + "','" + score + "','"+categoryId+"','"+leagueId+"')" +
                         " ON DUPLICATE KEY UPDATE sportId='" + sportID + "',matchtime='" + matchTime + "',betradarid='" + data.betradarId + "',active='" + data.active + "',matchStatus='" + matchStatus + "'," +
                         "betStatus='" + betStatus + "',score='" + score +"',updatedAt=NOW()");


                    if (sportID == 7) {///basket extra
                        extra = ['QScore','twoPoints','threePoints','fouls','freeThrows'];
                    }////basket extra

                }///!football







                 extraData = "{";
                 count = extra.length;
                var j = 0 ;
               extra.forEach(function(ex){

                   if(j<(count-1)){
                   extraData += "\""+ex+"\": "+ general_helper.escapeHtml2(JSON.stringify(data[ex]))+",";
                   }else{
                    extraData += "\""+ex+"\": "+ general_helper.escapeHtml2(JSON.stringify(data[ex]));
                   }
                   j++;
               });
               extraData +="}";

                if(count){
               baglanti.query("INSERT INTO matches_extradata (matchId,extradata) VALUES ('"+matchID+"','"+extraData+"') ON DUPLICATE KEY UPDATE extraData='"+extraData+"',updatedAt=NOW()");
                }




               //////////////////////////scores/////////////////////////////////////////////////
               var scoreJson = "{\"score\":"+ general_helper.escapeHtml2(JSON.stringify(data.score))+"}";
                sql = "INSERT INTO match_score (matchId,scoreJson) VALUES ('"+matchID+"','"+scoreJson+"') ON DUPLICATE KEY UPDATE scoreJson='"+scoreJson+"',updatedAt=NOW()";
                baglanti.query(sql);
               //////////////////////////scores/////////////////////////////////////////////////


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

                console.log(betStatus);
                 if(betStatus != 'paused'){

                console.log(sportID);
                console.log(JSON.stringify(data.odds));
                var oddvalue="";
                var outcome = "";

                data.odds.forEach(function (item) {/////oddtypes
                    //
                    // console.log("------------------ITEM---------------------------");
                    // console.log(JSON.stringify(item));
                    // console.log("------------------ITEM---------------------------");

                    oddtypeid =  general_helper.escapeHtml(JSON.stringify(item.oddstype))   ;
                    typeName = general_helper.escapeHtml(JSON.stringify(item.typename));
                    if(!general_helper.isEmpty(oddtypeid)){
                        sql = "INSERT INTO oddtypes (oddtypeid,oddtypevalue,sportid) VALUES ('"+oddtypeid+"','"+typeName+"','"+sportID+"')" +
                            "ON DUPLICATE KEY UPDATE oddtypevalue='"+typeName+"',updatedAt=NOW()";
                             baglanti.query(sql);
                             oddsId= item.oddsid;
                    ////odds
                          type_active = (item.active) ?1:0;
                        if(type_active) {
                        item.odds.forEach(function (odd_item){
                                oddvalue =general_helper.escapeHtml(JSON.stringify(odd_item.odd));
                                outcome =  general_helper.escapeHtml(JSON.stringify(odd_item.outcome));
                                outcomeOddId = (general_helper.isEmpty(JSON.stringify(odd_item.oddid)))?0:general_helper.escapeHtml(JSON.stringify(odd_item.oddid));
                                outcomeId =  general_helper.escapeHtml(JSON.stringify(odd_item.outcomeid));
                                outcomeId = (outcomeId=='')?0:outcomeId;
                                    specialvalue   =(general_helper.isEmpty(odd_item.specialvalue))? 0 : general_helper.escapeHtml(JSON.stringify(odd_item.specialvalue));
                                    active = (odd_item.active) ? 1 : 0;
                                sql =  "INSERT INTO odds (oddid,outcomeOddId,matchid,oddFieldTypeId,oddTypeId,special,active,odd,outcome) VALUES " +
                                    "('"+oddsId+"','"+outcomeOddId+"','"+matchID+"','"+outcomeId+"','"+oddtypeid+"','"+specialvalue+"','"+active+"','"+oddvalue+"','"+outcome+"')" +
                                    " ON DUPLICATE KEY UPDATE  odd='"+oddvalue+"',active='"+active+"',special='"+specialvalue+"',oddFieldTypeId='"+outcomeId+"',updatedAt=NOW()";

                            // console.log("-----------------------------------");
                            //  console.log(sql);
                            // console.log("-----------------------------------");
                           baglanti.query(sql);
                            sql = "INSERT INTO oddfieldtypes (oddtypeid,typeid,type) VALUES ('"+oddtypeid+"','"+outcomeId+"','"+outcome+"') ON DUPLICATE KEY UPDATE type='"+outcome+"',updatedAt=NOW()";
                            baglanti.query(sql);
                        });////odds.odd
                        }else{
                         //   console.log(oddsId+" active:0")
                            baglanti.query("UPDATE odds SET active='0',odd='0' WHERE oddid='"+oddsId+"'");
                        }
                    }//oddtypeid

                }); ///odds
                ///////////////////////ODDTYPES-ODDS/////////////////////////////////////////////////////

                }else{///paused
                    baglanti.query("UPDATE odds SET active=0,odd=0 WHERE matchid='"+matchID+"'");
                }///paused
                i++;


            }else{/////eksik veri |matchID +":"+ sportID +":"+ categoryId+":YOK"
               console.log(matchID +":"+ sportID +":"+ categoryId+":YOK")
           }//!empty

        }catch (err){

            // if(basket==0){
            //     socket.emit('alert2',JSON.stringify(data));
            //     socket.emit('alert',JSON.stringify(err));
            //     console.log(err);
            //     basket++;
            // }
        }

     }); /// remote_event

    socket.on('showFields', function () {
        socket.emit('alert', sql);
    });

    socket.on('showData', function () {
        socket.emit('alert', JSON.stringify(data));
    });

    socket.on('disconnect', function () {
        console.log('smo disconnected!');
    })


});