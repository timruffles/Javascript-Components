dojo.provide('strly.data.StoreLinker');
dojo.require('strly.data.helper');

(function($){
    strly.data.StoreLinker.link = function(storeOne,storeTwo,keywordArgs) {
        // setup all event listenrs to be handelled by default or passed in handels
        var self = this;
        $.forEach(['Set','New','Delete'],function(action) {
            $.every([[storeOne,storeTwo],[storeTwo,storeOne]],function(stores) {
                (function() { // generate closure for values of storeOne and two
                    var storeOne = stores[0], storeTwo = stores[1];
                    $.connect(storeOne,'on' + action,function(o,t,tr) {
                        var f = keywordArgs['_on' + action] ? keywordArgs['_on' + action] : self['_on' + action];
                        var args = Array.prototype.slice.call(arguments);
                        f.apply(null,args.concat([storeTwo,storeOne]));
                    });
                    return keywordArgs.bidirectional ? true : false;
                })();
            });
        });
    }
    strly.data.StoreLinker._onSet = function(/* item */ item,
        /* attribute-name-string */ attribute,
        /* object | array */ oldValue,
        /* object | array */ newValue,
        linkedStore,
        sourceStore){
        linkedStore.setValue(item,attribute,newvalue);
    },

    strly.data.StoreLinker._onNew = function(/* item */ newItem,parentInfo, linkedStore,sourceStore){
        linkedStore.newItem(strly.data.helper.getItemAsObject(newItem,sourceStore));
    },

    strly.data.StoreLinker._onDelete = function(/* item */ deletedItem, linkedStore,sourceStore){
        linkedStore.fetchItemByIdentity({identity:sourceStore.getIdentity(deletedItem),onItem:function(item){
            linkedStore.deleteItem(item);
        }});
    }
})(dojo);