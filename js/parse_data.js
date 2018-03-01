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
    var basketData="";
    socket_remote.on('event', function (data) {
        var matchID = JSON.stringify(data.matchId);
        var sportID = general_helper.escapeHtml(JSON.stringify(data.sportId));
        var categoryId = general_helper.escapeHtml(JSON.stringify(data.countryId));
        var categoryName = general_helper.escapeHtml(JSON.stringify(data.countryName));
        var leagueId = general_helper.escapeHtml(JSON.stringify(data.leagueId));
        var leagueName = general_helper.escapeHtml(JSON.stringify(data.leagueName));
        var sportName = general_helper.escapeHtml(JSON.stringify(data.sportName));
        var matchTime = general_helper.escapeHtml(JSON.stringify(data.matchTime));
        var hteam = general_helper.escapeHtml(JSON.stringify(data.hteam));
        var ateam = general_helper.escapeHtml(JSON.stringify(data.ateam));


        baglanti.query("insert into `sport` (sportId,lang,sportName,minTip,status,liveStatus,locks,listOrder)   Values ('" + sportID + "','en','" + sportName + "','1','1','1','0','1')" +
            " on duplicate key update sportName='" + sportName + "'");
        baglanti.query("INSERT INTO category (sportId,categoryId,lang,categoryName,listOrder,minTip,status,liveStatus,locks) VALUES" +
            "('" + sportID + "','" + categoryId + "','en','" + categoryName + "','1','1','1','1','0')" +
            " ON duplicate KEY UPDATE categoryName='" + categoryName + "',sportId='" + sportID + "'");
        baglanti.query("INSERT INTO tournament (sportId,categoryId,tournamentId,lang,tournamentName,minTip,oddsLock,listOrder,status,liveStatus,locks)" +
            " VALUES ('" + sportID + "','" + categoryId + "','" + leagueId + "','en','" + leagueName + "','1','0','1','1','1','0') ON DUPLICATE KEY UPDATE sportId='" + sportID + "'," +
            "categoryId='" + categoryId + "',tournamentName='" + leagueName + "'");
        baglanti.query("INSERT INTO competitor (compId,lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
            "('" + Math.round(Math.random() * 10000) + "','en','11','" + sportID + "','" + categoryId + "','" + leagueId + "','0','" + hteam + "','0')" +
            "ON DUPLICATE KEY UPDATE tournamentId='" + leagueId + "'");
        baglanti.query("INSERT INTO competitor (compId,lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
            "('" + Math.round(Math.random() * 10000) + "','en','11','" + sportID + "','" + categoryId + "','" + leagueId + "','0','" + ateam + "','0')" +
            "ON DUPLICATE KEY UPDATE tournamentId='" + leagueId + "'");

        //////////football
        socket.emit('alert2',i);
        if (sportID == 4) {////football

            var matchStatus = general_helper.escapeHtml(JSON.stringify(data.matchStatus));
            var betStatus = general_helper.escapeHtml(JSON.stringify(data.betStatus));
            var score = general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreHome)) + ":" + general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreAway));
            var yellowcardsaway = general_helper.findInt(data.cards.yellowCards.Away1StHalf) + general_helper.findInt(data.cards.yellowCards.Away2StHalf) + general_helper.findInt(data.cards.yellowCards.Away3StHalf) + general_helper.findInt(data.cards.yellowCards.Away4StHalf);
            var yellowcardshome = general_helper.findInt(data.cards.yellowCards.Home1StHalf) + general_helper.findInt(data.cards.yellowCards.Home2StHalf) + general_helper.findInt(data.cards.yellowCards.Home3StHalf) + general_helper.findInt(data.cards.yellowCards.Home4StHalf);
            var redcardsaway = general_helper.findInt(data.cards.redCards.Home1StHalf) + general_helper.findInt(data.cards.redCards.Home2StHalf) + general_helper.findInt(data.cards.redCards.Home3StHalf) + general_helper.findInt(data.cards.redCards.Home4StHalf);
            var redcardshome = general_helper.findInt(data.cards.redCards.Home1StHalf) + general_helper.findInt(data.cards.redCards.Home2StHalf) + general_helper.findInt(data.cards.redCards.Home3StHalf) + general_helper.findInt(data.cards.redCards.Home4StHalf);
            var cornersaway = general_helper.findInt(data.corners.Away1StHalf) + general_helper.findInt(data.corners.Away2StHalf) + general_helper.findInt(data.corners.Away3StHalf) + general_helper.findInt(data.corners.Away4StHalf);
            var cornershome = general_helper.findInt(data.corners.Home1StHalf) + general_helper.findInt(data.corners.Home2StHalf) + general_helper.findInt(data.corners.Home3StHalf) + general_helper.findInt(data.corners.Home4StHalf);
            var yellowredcardsaway = 0;///güncellenecek
            var yellowredcardshome = 0;///güncellenecek
            // baglanti.query("INSERT INTO tmp (title,data,type) VALUES ('"+matchID+"','"+JSON.stringify(data.cards.yellowCards)+"','15')");
            baglanti.query("INSERT INTO matches " +
                "(matchid,sportid,matchtime,betradarid,active,matchStatus,betStatus,score,yellowredcardsaway,yellowredcardshome,redcardsaway,redcardshome," +
                "yellowcardsaway,yellowcardshome,cornersaway,cornershome) " +
                "VALUES " +
                "('" + matchID + "','" + sportID + "','" + matchTime + "','" + data.betradarId + "','" + data.active + "','" + matchStatus + "','" + betStatus + "','" + score + "','" + yellowredcardsaway + "'," +
                "'" + yellowredcardshome + "','" + redcardsaway + "'," +
                "'" + redcardshome + "','" + yellowcardsaway + "','" + yellowcardshome + "','" + cornersaway + "','" + cornershome + "')" +
                " ON DUPLICATE KEY UPDATE sportId='" + sportID + "',matchtime='" + matchTime + "',betradarid='" + data.betradarId + "',active='" + data.active + "',matchStatus='" + matchStatus + "'," +
                "betStatus='" + betStatus + "',score='" + score + "',yellowredcardsaway='" + yellowredcardsaway + "',yellowredcardshome='" + yellowredcardshome + "'," +
                "redcardsaway='" + redcardsaway + "',redcardshome='" + redcardshome + "',yellowcardsaway='" + yellowcardsaway + "',yellowcardshome='" + yellowcardshome + "',cornersaway='" + cornersaway + "'," +
                "cornershome='" + cornershome + "',updatedAt=NOW()");

            console.log(data.score.matchscore);

            var scoreHome = general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreHome));
            var scoreAway = general_helper.escapeHtml(JSON.stringify(data.score.matchScore.scoreAway));
            var Home1StHalf = general_helper.escapeHtml(JSON.stringify(data.score.periodScore.Home1StHalf));
            var Away1StHalf = general_helper.escapeHtml(JSON.stringify(data.score.periodScore.Away1StHalf));
            var Home2StHalf = general_helper.escapeHtml(JSON.stringify(data.score.periodScore.Home2StHalf));
            var Away2StHalf = general_helper.escapeHtml(JSON.stringify(data.score.periodScore.Away2StHalf));
            var totalHome = general_helper.escapeHtml(JSON.stringify(data.score.periodScore.totalHome))
            var totalAway = general_helper.escapeHtml(JSON.stringify(data.score.periodScore.totalAway));

            sql = "INSERT INTO football_score (matchId,scoreHome,scoreAway,Home1StHalf,Away1StHalf,Home2StHalf,Away2StHalf,totalHome,totalAway) VALUES " +
                "('"+matchID+"','"+scoreHome+"','"+scoreAway+"','"+Home1StHalf+"','"+Away1StHalf+"','"+Home2StHalf+"','"+Away2StHalf+"','"+totalHome+"','"+totalAway+"') " +
                "ON DUPLICATE KEY UPDATE scoreHome='"+scoreHome+"',scoreAway='"+scoreAway+"',Home1StHalf='"+Home1StHalf+"'" +
                ",Away1StHalf='"+Away1StHalf+"',Home2StHalf='"+Home2StHalf+"',Away2StHalf='"+Away2StHalf+"',totalHome='"+totalHome+"',totalAway='"+totalAway+"'," +
                "updatedAt=NOW()";

            if(i==0){
            socket.emit('alert', sql);

            //    console.log(matchID+":"+Home1StHalf);
            i++;
            }

             baglanti.query(sql);

        }///football

        if (sportID == 5) {////basketball
                // basketData = JSON.stringify(data);
                // baglanti.query("INSERT INTO tmp (title,data,type) VALUES ('tennis','"+general_helper.escapeHtml(basketData)+"','5')");
                // if(basket==0){
                //   ///  console.log(data,basketData);
                //     socket.emit('alert',basketData);
                //     basket++;
                // }
        }////basketball


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


                i++;

            });////odds.odd

        }); ///odds
        ///////////////////////ODDTYPES-ODDS/////////////////////////////////////////////////////
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