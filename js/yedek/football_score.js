
var Home1StHalf = general_helper.findInt(general_helper.escapeHtml(JSON.stringify(data.score.periodScore.Home1StHalf)));
var Away1StHalf = general_helper.findInt(general_helper.escapeHtml(JSON.stringify(data.score.periodScore.Away1StHalf)));
var Home2StHalf = general_helper.findInt(general_helper.escapeHtml(JSON.stringify(data.score.periodScore.Home2StHalf)));
var Away2StHalf = general_helper.findInt(general_helper.escapeHtml(JSON.stringify(data.score.periodScore.Away2StHalf)));
var totalHome = general_helper.findInt(general_helper.escapeHtml(JSON.stringify(data.score.periodScore.totalHome)));

var totalAway = general_helper.escapeHtml(JSON.stringify(data.score.periodScore.totalAway));



baglanti.query("INSERT INTO football_score (matchId,scoreHome,scoreAway,Home1StHalf,Away1StHalf,Home2StHalf,Away2StHalf,totalHome,totalAway) VALUES " +
    "('"+matchID+"','"+scoreHome+"','"+scoreAway+"','"+Home1StHalf+"','"+Away1StHalf+"','"+Home2StHalf+"','"+Away2StHalf+"','"+totalHome+"','"+totalAway+"') " +
    "ON DUPLICATE KEY UPDATE scoreHome='"+scoreHome+"',scoreAway='"+scoreAway+"',Home1StHalf='"+Home1StHalf+"'" +
    ",Away1StHalf='"+Away1StHalf+"',Home2StHalf='"+Home2StHalf+"',Away2StHalf='"+Away2StHalf+"',totalHome='"+totalHome+"',totalAway='"+totalAway+"'," +
    "updatedAt=NOW()");