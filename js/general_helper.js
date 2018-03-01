module.exports = {

    escapeHtml : function (unsafe) {
    return unsafe
    /*    .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");*/
        .replace(/'/g, "")
        .replace(/-/g, "0")
        .replace(/"/g, "");
},
    findInt : function  (data){
    data = this.escapeHtml(JSON.stringify(data)).replace("-", 0);
    return parseInt(data);
},

    parseData : function (data) {
        console.log(data);
        }

}