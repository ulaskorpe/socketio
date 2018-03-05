module.exports = {
 


    isFunction:  function (functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
        },

    escapeHtml: function(unsafe) {
        return unsafe &&  this.isFunction(unsafe.replace) ? unsafe
            //.replace(/&/g, "&amp;")
         //   .replace(/</g, "&lt;")
          //  .replace(/>/g, "&gt;")
            .replace(/"/g, "")
            .replace(/'/g, "") : unsafe;
        },

    findInt : function  (data){
    data = this.escapeHtml(JSON.stringify(data));
   // data = (data == undefined) ? 0 : (isNaN(data) ? 0 :data) ;
    data = (isNaN(data))?0: ((data == undefined) ? 0 : data );
    return parseInt(data);
    //    return 0 ;
    },
    isNull : function (data) {
        return ((data != null) && (data!='-'))?data : 0;
    },
    isEmpty :function (str) {
       return (!str || 0 === str.length) ;
    }


};