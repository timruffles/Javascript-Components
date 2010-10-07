dojo.provide('strly.layout.BigOlAddDelete');
dojo.require('strly.layout.BigOl');
dojo.declare('strly.layout.BigOlAddDelete',[strly.layout.BigOl],{
    postMixInProperties: function() {
        this._class = 'strlyComponentsBigOl strlyComponentsBigOlAddDelete';
        this._liString = '<li class="strlyBigOlItemsLi"><div class="cnt"><span class="number"></span><div class="content"></div></div><input type="button" value="-" class="strlyBigOlAddDeleteBtn" /></li>'
        this.inherited('postMixInProperties',arguments);
    },
    postCreate:function() {
        var addBtn = dojo.create('input',{value:'+',type:'button',class:'addBtn'},this.containerNode);
        dojo.connect(addBtn,'click',this,this._onAddItem);
        dojo.connect(this.items,'click',this,this._onClick);
        this.inherited('postCreate',arguments);
    },
    _onAddItem:function(){
        this.onAddItem();
    },
    onAddItem:function(){},
    _onClick:function(event) {
        // check if this is delete btn, if so, remove element
        var btnCandidate = event.target;
        if(dojo.hasClass(btnCandidate,'strlyBigOlAddDeleteBtn')) {
            var item = this.store.fetchItemByIdentity({
                identity:dojo.attr(btnCandidate.parentNode,'identity'),
                onItem:dojo.hitch(this,function(item) {
                    if(this.beforeOnDelete(item)) {
                        this.store.deleteItem(item);
                    }
                })
            });
        }
    },
    /**
     * Pass in a function that checks an item pre-deletion, returning bool on whether it should be deleted
     */
    beforeOnDelete:function(item) {
        return true;
    }
});