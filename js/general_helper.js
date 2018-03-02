module.exports = {
    escapeHtml : function (unsafe) {

        if(this.isEmpty(unsafe)){
    return unsafe
    /*    .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")*/
        .replace(/'/g, "&#039;")
        .replace(/'/g, '')
        .replace(/-/g, "0")
        .replace(/"/g, "");
        }else{

            return null;
        }
    },
    findInt : function  (data){
    data = this.escapeHtml(JSON.stringify(data));
    return parseInt(data);
    },
    isNull : function (data) {
        return ((data != null) && (data!='-'))?data : 0;
    },
    isEmpty :function (str) {
       return (!str || 0 === str.length) ;
    }


}