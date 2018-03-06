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


///////////////////////////////////server///////////////////////////
var app = require('http').createServer();
var io = require('socket.io')(app);
app.listen(4646);
console.log('socketio-mysql2 server created');

io.on('connection', function (socket) {
    baglanti.query("TRUNCATE TABLE matches");
  //  baglanti.query("TRUNCATE TABLE tmp");
    console.log("smo connected");
    var i = 0;
    var basket = 0;
    var typeName ="";
    var say = 0;
    var extraData = "";
    var count = 0;

    socket_remote.on('event', function (data) {
        var extra =[];
        try {
            var matchID = JSON.stringify(data.matchId);
            socket.emit('count',i);
         //   console.log(matchID);
            var sportID =  JSON.stringify(data.sportId);
            var categoryId = general_helper.escapeHtml(JSON.stringify(data.countryId));
            var categoryName = general_helper.escapeHtml(JSON.stringify(data.countryName));
            var leagueId = general_helper.escapeHtml(JSON.stringify(data.leagueId));
            var leagueName =  general_helper.escapeHtml(JSON.stringify(data.leagueName));
            var sportName = general_helper.escapeHtml(JSON.stringify(data.sportName));
            var matchTime = general_helper.escapeHtml(JSON.stringify(data.matchTime));
            var hteam = general_helper.escapeHtml(JSON.stringify(data.hteam));
            var ateam = general_helper.escapeHtml(JSON.stringify(data.ateam));


            // if(say==0 && sportID==18){
            //     console.log(JSON.stringify(data));
            //     say ++;
            // }

           if(matchID && sportID && categoryId){

                baglanti.query("insert into `sport` (sportId,lang,sportName,minTip,status,liveStatus,locks,listOrder)   Values ('" + sportID + "','en','" + sportName + "','1','1','1','0','1')" +
                    " on duplicate key update sportName='" + sportName + "'");
                baglanti.query("INSERT INTO category (sportId,categoryId,lang,categoryName,listOrder,minTip,status,liveStatus,locks) VALUES" +
                    "('" + sportID + "','" + categoryId + "','en','" + categoryName + "','1','1','1','1','0')" +
                    " ON duplicate KEY UPDATE categoryName='" + categoryName + "',sportId='" + sportID + "'");
                baglanti.query("INSERT INTO tournament (sportId,categoryId,tournamentId,lang,tournamentName,minTip,oddsLock,listOrder,status,liveStatus,locks)" +
                    " VALUES ('" + sportID + "','" + categoryId + "','" + leagueId + "','en','" + leagueName + "','1','0','1','1','1','0') ON DUPLICATE KEY UPDATE sportId='" + sportID + "' , categoryId='" + categoryId + "',tournamentName='" + leagueName + "'");
                baglanti.query("INSERT INTO competitor (compId,lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
                    "('" + Math.round(Math.random() * 10000) + "','en','11','" + sportID + "','" + categoryId + "','" + leagueId + "','0','" + hteam + "','0')" +
                    "ON DUPLICATE KEY UPDATE tournamentId='" + leagueId + "'");
                baglanti.query("INSERT INTO competitor (compId,lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
                    "('" + Math.round(Math.random() * 10000) + "','en','11','" + sportID + "','" + categoryId + "','" + leagueId + "','0','" + ateam + "','0')" +
                    "ON DUPLICATE KEY UPDATE tournamentId='" + leagueId + "'");

                //////////football

                var matchStatus = general_helper.escapeHtml(JSON.stringify(data.matchStatus));
                var betStatus = general_helper.escapeHtml(JSON.stringify(data.betStatus));

                //     var scoreHome = (general_helper.isEmpty(data.score.matchScore.scoreHome)) ? general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreHome)):0;// (data.score.matchScore.scoreHome!=null)? general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreHome)) : 0;
                //   var scoreAway = (general_helper.isEmpty(data.score.matchScore.scoreAway)) ? general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreAway)) :0;// (data.score.matchScore.scoreAway!=null)? general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreAway)) : 0;


                var scoreHome =  (general_helper.isEmpty(JSON.stringify(data.score.matchScore)))?0:JSON.stringify(data.score.matchScore.scoreHome);
                var scoreAway =  (general_helper.isEmpty(JSON.stringify(data.score.matchScore)))?0:JSON.stringify(data.score.matchScore.scoreAway);

               scoreHome = (scoreHome == undefined) ? 0 : scoreHome;
               scoreAway = (scoreAway ==undefined) ? 0 : scoreAway;
               var score = scoreHome+ ":" + scoreAway;

                if (sportID == 4) {////football
                    var yellowcardsaway = general_helper.findInt(data.cards.yellowCards.Away1StHalf) + general_helper.findInt(data.cards.yellowCards.Away2StHalf) + general_helper.findInt(data.cards.yellowCards.Away3StHalf) + general_helper.findInt(data.cards.yellowCards.Away4StHalf);
                    var yellowcardshome = general_helper.findInt(data.cards.yellowCards.Home1StHalf) + general_helper.findInt(data.cards.yellowCards.Home2StHalf) + general_helper.findInt(data.cards.yellowCards.Home3StHalf) + general_helper.findInt(data.cards.yellowCards.Home4StHalf);
                    var redcardsaway = general_helper.findInt(data.cards.redCards.Home1StHalf) + general_helper.findInt(data.cards.redCards.Home2StHalf) + general_helper.findInt(data.cards.redCards.Home3StHalf) + general_helper.findInt(data.cards.redCards.Home4StHalf);
                    var redcardshome = general_helper.findInt(data.cards.redCards.Home1StHalf) + general_helper.findInt(data.cards.redCards.Home2StHalf) + general_helper.findInt(data.cards.redCards.Home3StHalf) + general_helper.findInt(data.cards.redCards.Home4StHalf);
                    var cornersaway = general_helper.findInt(data.corners.Away1StHalf) + general_helper.findInt(data.corners.Away2StHalf) + general_helper.findInt(data.corners.Away3StHalf) + general_helper.findInt(data.corners.Away4StHalf);
                    var cornershome = general_helper.findInt(data.corners.Home1StHalf) + general_helper.findInt(data.corners.Home2StHalf) + general_helper.findInt(data.corners.Home3StHalf) + general_helper.findInt(data.corners.Home4StHalf);
                    var yellowredcardsaway = 0;///güncellenecek
                    var yellowredcardshome = 0;///güncellenecek
                    // baglanti.query("INSERT INTO tmp (title,data,type) VALUES ('"+matchID+"','"+JSON.stringify(data.cards.yellowCards)+"','15')");
                    try {
                        baglanti.query("INSERT INTO matches " +
                            "(matchid,sportid,matchtime,betradarid,active,matchStatus,betStatus,score,yellowredcardsaway,yellowredcardshome,redcardsaway,redcardshome," +
                            "yellowcardsaway,yellowcardshome,cornersaway,cornershome,categoryid,tournamentid) " +
                            "VALUES " +
                            "('" + matchID + "','" + sportID + "','" + matchTime + "','" + data.betradarId + "','" + data.active + "','" + matchStatus + "','" + betStatus + "','" + score + "','" + yellowredcardsaway + "'," +
                            "'" + yellowredcardshome + "','" + redcardsaway + "'," +
                            "'" + redcardshome + "','" + yellowcardsaway + "','" + yellowcardshome + "','" + cornersaway + "','" + cornershome + "','"+categoryId+"','"+leagueId+"')" +
                            " ON DUPLICATE KEY UPDATE sportId='" + sportID + "',matchtime='" + matchTime + "',betradarid='" + data.betradarId + "',active='" + data.active + "',matchStatus='" + matchStatus + "'," +
                            "betStatus='" + betStatus + "',score='" + score + "',yellowredcardsaway='" + yellowredcardsaway + "',yellowredcardshome='" + yellowredcardshome + "'," +
                            "redcardsaway='" + redcardsaway + "',redcardshome='" + redcardshome + "',yellowcardsaway='" + yellowcardsaway + "',yellowcardshome='" + yellowcardshome + "',cornersaway='" + cornersaway + "'," +
                            "cornershome='" + cornershome + "',updatedAt=NOW()");

                    }catch (err){}

                extra = ['cards','corners','penalties'];



                }else{///!football
                    var sql = "INSERT INTO matches " +
                        "(matchid,sportid,matchtime,betradarid,active,matchStatus,betStatus,score,categoryid,tournamentid) " +
                        "VALUES " +
                        "('" + matchID + "','" + sportID + "','" + matchTime + "','" + data.betradarId + "','" + data.active + "','" + matchStatus + "','" + betStatus + "','" + score + "','"+categoryId+"','"+leagueId+"')" +
                        " ON DUPLICATE KEY UPDATE sportId='" + sportID + "',matchtime='" + matchTime + "',betradarid='" + data.betradarId + "',active='" + data.active + "',matchStatus='" + matchStatus + "'," +
                        "betStatus='" + betStatus + "',score='" + score +"',updatedAt=NOW()";
                   //  console.log(sql);
                     baglanti.query(sql);


                    if (sportID == 7) {///basket extra
                        extra = ['QScore','twoPoints','threePoints','fouls','freeThrows'];
                    }////basket extra

                    if (sportID == 16) {


                    }////basketball



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
               var sql = "INSERT INTO match_score (matchId,scoreJson) VALUES ('"+matchID+"','"+scoreJson+"') ON DUPLICATE KEY UPDATE scoreJson='"+scoreJson+"',updatedAt=NOW()";
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
                var active =0;
                var oddvalue="";
                var outcome = "";
                data.odds.forEach(function (item) {
                    var oddtypeid = general_helper.findInt(item.oddsType);
                    /*
                    *  "oddsId":251577464,   //// odds.oddid PK
                   "oddsType":62, /// oddtypeid --- PK
                   "special":"",
                   "active":true,
                   "typeName":"Match Winner", //// type varchar
                            * */

                    typeName = general_helper.escapeHtml(JSON.stringify(item.typeName));

                    if(typeName!=undefined){

                    baglanti.query("INSERT INTO oddtypes (oddtypeid,oddtypevalue,sportid) VALUES ('"+oddtypeid+"','"+typeName+"','"+sportID+"')" +
                        "ON DUPLICATE KEY UPDATE oddtypevalue='"+typeName+"',updatedAt=NOW()");

                    var oddtypeid= general_helper.findInt(general_helper.escapeHtml(item.oddsType));
                    var oddsId= item.oddsId;
                    var special= item.special;

                    item.odds.forEach(function (odd){
                        if(oddsId!=undefined){
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

                        }else{
                            console.log(oddsId+":"+oddtypeid);
                        }



                    });////odds.odd
                    }
                }); ///odds
                ///////////////////////ODDTYPES-ODDS/////////////////////////////////////////////////////


            }else{/////eksik veri |matchID +":"+ sportID +":"+ categoryId+":YOK"
               console.log(matchID +":"+ sportID +":"+ categoryId+":YOK")
           }//!empty
            i++;
        }catch (err){

            if(basket==0){
                socket.emit('alert2',JSON.stringify(data));
                socket.emit('alert',JSON.stringify(err));
                console.log(err);
                basket++;
            }
        }

     }); /// remote_event

    socket.on('showFields', function () {
        socket.emit('alert', 'showfields');
    });

    socket.on('showData', function () {
        socket.emit('alert', 'showdata');
    });

    socket.on('disconnect', function () {
        console.log('smo disconnected!');
    })


});