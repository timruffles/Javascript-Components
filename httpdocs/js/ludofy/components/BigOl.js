dojo.provide('ludofy.components.BigOl');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dojo.data.ItemFileWriteStore');
dojo.declare('ludofy.components.BigOl',[dijit._Widget,dijit._Templated],{

    templateString:'<div dojoAttachPoint="containerNode" class="${_class}"><ul class="items" dojoAttachPoint="items"></ul></div>',

    prefix:'#',
    suffix:'',
    _class:'ludofyComponentsBigOl',
    _list:[],
    _liString:'<li class="ludofyBigOlItemsLi"><div class="cnt"><span class="number"></span><div class="content"></div></div></li>',
    store:false,
    itemRenderer:false,
    _setStoreAttr:function(store) {
        this.store = store;
        this._render();
    },
    _render:function() {
        this.store.fetch({
            onComplete:function(items){
                dojo.forEach(items,this,function(item){

                });
            }
        });
    },
    push:function(domOrString) {
        dojo.query(this.items).addContent(this._liString,'last');
        //this.items.innerHTML += this._liString;
        var contentWrap = dojo.query('li:last-child .content',this.items)[0];
        if(dojo.isString(domOrString)) {
            contentWrap.innerHTML += domOrString;
        } else {
            dojo.place(domOrString,contentWrap,'last');
        }
        this._list.push(domOrString);
        this._renumber();
    },
    pop:function(item) {
        var first = dojo.query(this.items).pop();
        dojo.destroy(first);
        return this._list.pop();
    },
    shift:function() {
         var last = dojo.query(this.items).shift();
         dojo.destroy(last);
         return this._list.shift();
    },
    get:function(index) {
         return this._list[index];
    },
    slice:function(from,to) {
        dojo.query('li',this.list).forEach(function(li,index){
            if(index >= from && index <= to) {
                dojo.destroy(li);
            }
        });
        return this._list.slice(from,to);
    },
    indexOf:function(needle) {
         return this._list.indexOf(needle);
    },
    _renumber:function() {
        var self= this;
        dojo.query('.number',this.items).forEach(function(number,index) {
            number.innerHTML = self.prefix + (index + 1).toString() + self.suffix;
        });
    },
    getItems:function() {
        return dojo.filter(this,'item instanceOf Number');
    }
});