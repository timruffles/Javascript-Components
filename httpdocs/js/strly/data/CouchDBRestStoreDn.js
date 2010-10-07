dojo.provide('strly.data.CouchDBRestStoreDn');
dojo.require('dojox.data.CouchDBRestStore');

dojo.declare('strly.data.CouchDBRestStoreDn',dojox.data.CouchDBRestStore,{
    // fixing broken implementation
    _processResults: function(results){
            var rows = results.rows;
            if(rows){
                    var prefix = this.service.servicePath;
                    var self = this;
                    for(var i = 0; i < rows.length;i++){
                            var realItem = rows[i].value;
                            realItem.__id= prefix + rows[i].id;
                            realItem._id= rows[i].id;
                            realItem._rev = realItem.rev; // WTF!!!!!!!
                             delete realItem.rev;
                            realItem._loadObject= dojox.rpc.JsonRest._loader;
                            rows[i] = realItem;
                    }
                    return {totalCount:results.total_rows, items:results.rows};
            }else{
                    return {items:results};
            }

    }
});