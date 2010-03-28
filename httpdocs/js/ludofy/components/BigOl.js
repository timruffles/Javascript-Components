dojo.provide('ludofy.components.BigOl');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dojo.data.ItemFileWriteStore');
dojo.require('ludofy.components.ItemEditor');

dojo.declare('ludofy.components.BigOl',[dijit._Widget,dijit._Templated],{

    templateString:'<div dojoAttachPoint="containerNode" class="${_class}"><ul class="items" dojoAttachPoint="items"></ul></div>',

    prefix:'#',
    suffix:'',
    _class:'ludofyComponentsBigOl',
    _liString:'<li class="ludofyBigOlItemsLi"><div class="cnt"><span class="number"></span><div class="content"></div></div></li>',
    store:false,
    itemRenderer:'ludofy.components.ItemRenderer',
    itemRendererParams:{},
    _setStoreAttr:function(store) {
        this.store = store;
        dojo.connect(this.store,'onNew',this,this._renderItem);
        dojo.connect(this.store,'onDelete',this,this._removeItem);
        this._render();
    },
    _render:function() {
        this.store.fetch({
            onItem:dojo.hitch(this,this._renderItem),
            onError:dojo.hitch(this,function(error){
                throw this._class + ' could not fetch from store because' + error;
            })
        });
    },
    _renderItem:function(item) {
        // instantiate itemRenderer, create container, and place, also setting identity attribute on container
        // for easy deletion later
        dojo.require('ludofy.components.ItemRenderer');
        var itemRendererClass = dojo.getObject(this.itemRenderer);
        var params = dojo.mixin({item:item},this.itemRendererParams);
        var itemRenderer = new itemRendererClass(params,dojo.create('div'));
        
        dojo.query(this.items).addContent(this._liString,'last');
        dojo.query('li:last-child',this.items).attr('identity',this.store.getIdentity(item));
        dojo.query('li:last-child .content',this.items).addContent(itemRenderer.containerNode,'last');

        this._renumber();
    },
    _removeItem:function(item) {
        dojo.query('[identity="' + this.store.getIdentity(item) + '"]',this.items).forEach('dojo.destroy(item)');
        this._renumber();
    },
    _renumber:function() {
        var self= this;
        dojo.query('.number',this.items).forEach(function(number,index) {
            number.innerHTML = self.prefix + (index + 1).toString() + self.suffix;
        });
    },
    getRow:function(identityOrItem) {
        if(!dojo.isString(identityOrItem))
            identityOrItem = this.store.getIdentity(identityOrItem);
        var qRes = dojo.query('[identity="' + identityOrItem + '"]',this.items);
        return qRes.length ? qRes[0] :false;
    }
});