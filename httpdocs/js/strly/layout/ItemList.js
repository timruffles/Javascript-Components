dojo.provide('strly.layout.ItemList');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
/**
 * Renders the store using the provided ItemRenderer, and updates
 * those items when they are added and deleted. ItemRenderers are
 * responsible for rendering the state of the individual items.
 *
 * Also defines callbacks for some business events occuring to
 * ItemRenderers - onClick for instance.
 */
dojo.declare('strly.layout.ItemList',[dijit._Widget,dijit._Templated],{
    templateString:'<div dojoAttachPoint="containerNode" class="${_class}"><ul class="items" dojoAttachPoint="items"></ul></div>',
    _class:'strlyLayoutItemList',
    store:false,
    itemRenderer:'strly.layout.ItemRenderer',
    itemRendererParams:{},
    postMixInProperties:function() {
        this.inherited('postMixInProperties',arguments);
        if(!dojo.getObject(this.attr('itemRenderer'))) dojo.require(this.attr('itemRenderer'));
    },
    _setStoreAttr:function(store) {
        this.store = store;
        dojo.connect(this.store,'onNew',this,this._renderItem);
        dojo.connect(this.store,'onDelete',this,this._removeItem);
        this._render();
    },
    _setItemRendererAttr:function(to) {
        dojo.require(to);
    },
    _render:function() {
        this.store.fetch({
            onItem:dojo.hitch(this,this._renderItem),
            onError:dojo.hitch(this,function(error){
                throw this._class + ' could not renderer from store because' + error;
            })
        });
    },
    onClick:function(item){},
    _renderItem:function(item) {
        var renderer = this._wrapItem(item);
        dojo.place(renderer.containerNode,this.items,'last');
    },
    _removeItem:function(item) {
        dojo.query('[identity="' + this.store.getIdentity(item) + '"]',this.items).forEach('dojo.destroy(item)');
    },
    _wrapItem:function(item) {
        // instantiate itemRenderer, create container, and place, also setting identity attribute on container
        // for easy deletion later
        var itemRendererClass = dojo.getObject(this.attr('itemRenderer'));
        var params = dojo.mixin({item:item,store:this.attr('store')},this.attr('itemRendererParams'));
        var itemRenderer = new itemRendererClass(params);

        dojo.connect('onClick',itemRenderer.containerNode,function(){
            dojo.hitch(this,this.onClick(itemRenderer.attr('item')))
        });

        return itemRenderer;
    },
    getRow:function(identityOrItem) {
        if(!dojo.isString(identityOrItem))
            identityOrItem = this.store.getIdentity(identityOrItem);
        var qRes = dojo.query('[identity="' + identityOrItem + '"]',this.items);
        return qRes.length ? qRes[0] :false;
    }
});