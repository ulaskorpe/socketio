
var matchID=JSON.stringify(data.matchId);
var sportID = escapeHtml(JSON.stringify(data.sportId));
var categoryId = escapeHtml(JSON.stringify(data.countryId));
var categoryName = escapeHtml(JSON.stringify(data.countryName));
var leagueId = escapeHtml(JSON.stringify(data.leagueId));
var leagueName = escapeHtml(JSON.stringify(data.leagueName));
var sportName = escapeHtml(JSON.stringify(data.sportName));
var matchTime =escapeHtml(JSON.stringify(data.matchTime));
var hteam =escapeHtml(JSON.stringify(data.hteam));
var ateam =escapeHtml(JSON.stringify(data.ateam));

/// console.log(data.score);

baglanti.query("REPLACE INTO sport (sportId,lang,sportName,minTip,status,liveStatus,locks,listOrder) VALUES ('"+sportID+"','en','"+sportName+"','1','1','1','0','1')");
baglanti.query("REPLACE INTO category (sportId,categoryId,lang,categoryName,listOrder,minTip,status,liveStatus,locks) VALUES ('"+sportID+"','"+categoryId+"','en','"+categoryName+"','1','1','1','1','0')");
baglanti.query("REPLACE INTO tournament (sportId,categoryId,tournamentId,lang,tournamentName,minTip,oddsLock,listOrder,status,liveStatus,locks)" +
    " VALUES ('"+sportID+"','"+categoryId+"','"+leagueId+"','en','"+leagueName+"','1','0','1','1','1','0')");
baglanti.query("REPLACE INTO competitor (compId,lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
    "('"+Math.round(Math.random()*10000)+"','en','11','"+sportID+"','"+categoryId+"','"+leagueId+"','0','"+hteam+"','0')");
baglanti.query("REPLACE INTO competitor (compId,lang,compId2,sportId,categoryId,tournamentId,uploadImage,compName,locks) VALUES " +
    "('"+Math.round(Math.random()*10000)+"','en','11','"+sportID+"','"+categoryId+"','"+leagueId+"','0','"+ateam+"','0')");

console.log(sportID+":"+matchID);

if(sportID==4){////football only

    var matchStatus = escapeHtml(JSON.stringify(data.matchStatus));
    var betStatus = escapeHtml(JSON.stringify(data.betStatus));
    var score = escapeHtml(JSON.stringify(data.score.matchScore.scoreHome))+":"+escapeHtml(JSON.stringify(data.score.matchScore.scoreAway));
    var yellowcardsaway = findInt(data.cards.yellowCards.Away1StHalf) + findInt(data.cards.yellowCards.Away2StHalf) + findInt(data.cards.yellowCards.Away3StHalf) + findInt(data.cards.yellowCards.Away4StHalf) ;
    var yellowcardshome = findInt(data.cards.yellowCards.Home1StHalf) + findInt(data.cards.yellowCards.Home2StHalf) + findInt(data.cards.yellowCards.Home3StHalf) + findInt(data.cards.yellowCards.Home4StHalf) ;
    var redcardsaway = findInt(data.cards.redCards.Home1StHalf) + findInt(data.cards.redCards.Home2StHalf) + findInt(data.cards.redCards.Home3StHalf) + findInt(data.cards.redCards.Home4StHalf) ;
    var redcardshome = findInt(data.cards.redCards.Home1StHalf) + findInt(data.cards.redCards.Home2StHalf) + findInt(data.cards.redCards.Home3StHalf) + findInt(data.cards.redCards.Home4StHalf) ;
    var cornersaway = findInt(data.corners.Away1StHalf)+findInt(data.corners.Away2StHalf)+findInt(data.corners.Away3StHalf)+findInt(data.corners.Away4StHalf) ;
    var cornershome = findInt(data.corners.Home1StHalf)+findInt(data.corners.Home2StHalf)+findInt(data.corners.Home3StHalf)+findInt(data.corners.Home4StHalf) ;
    //console.log(matchID+":"+findInt(data.cards.redCards.Home1StHalf)+":"+findInt(data.cards.redCards.Home2StHalf)+":"+findInt(data.cards.redCards.Home3StHalf)+":"+findInt(data.cards.redCards.Home4StHalf));
    var yellowredcardsaway=redcardsaway+yellowcardsaway;
    var yellowredcardshome=redcardshome+yellowcardshome;
    // baglanti.query("INSERT INTO tmp (title,data,type) VALUES ('"+matchID+"','"+JSON.stringify(data.cards.yellowCards)+"','15')");

    sql ="REPLACE INTO matches (matchid,sportid,matchtime,betradarid,active,matchStatus,betStatus,score,yellowredcardsaway,yellowredcardshome,redcardsaway,redcardshome,yellowcardsaway,yellowcardshome,cornersaway,cornershome) " +
        "VALUES ('"+matchID+"','"+sportID+"','"+matchTime+"','"+data.betradarId+"','"+data.active+"','"+matchStatus+"','"+betStatus+"','"+score+"','"+yellowredcardsaway+"','"+yellowredcardshome+"','"+redcardsaway+"'," +
        "'"+redcardshome+"','"+yellowcardsaway+"','"+yellowcardshome+"','"+cornersaway+"','"+cornershome+"')";
    if(i==0){
        console.log(data.odds);
    }
    baglanti.query(sql);




    //console.log(sportName+":"+sportID+":"+matchID);
}///football only



