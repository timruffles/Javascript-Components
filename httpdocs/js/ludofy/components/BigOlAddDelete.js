dojo.provide('ludofy.components.BigOlAddDelete');
dojo.require('ludofy.components.BigOl');
dojo.declare('ludofy.components.BigOlAddDelete',[ludofy.components.BigOl],{
    postMixInProperties: function() {
        this._class = 'ludofyComponentsBigOl ludofyComponentsBigOlAddDelete';
        this._liString = '<li class="ludofyBigOlItemsLi"><div class="cnt"><span class="number"></span><div class="content"></div></div><input type="button" value="-" class="ludofyBigOlAddDeleteBtn" /></li>'
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
        if(dojo.hasClass(btnCandidate,'ludofyBigOlAddDeleteBtn')) {
            var curIndx = dojo.query('li',this.items).indexOf(btnCandidate.parentNode);
            this.slice(curIndx,curIndx);
            this._renumber();
        }
    }

});