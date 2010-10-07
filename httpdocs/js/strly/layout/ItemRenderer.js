dojo.provide('strly.layout.ItemRenderer');
//dojo.require('');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.declare('strly.layout.ItemRenderer',[dijit._Widget,dijit._Templated],{
    templateString:'<div dojoAttachPoint="containerNode"></div>',
    store:null,
    binding:{},
    item:null,
    startup:function() {
        dojo.connect('click',this.containerNode,dojo.hitch(this,function(){
            dojo.hitch(this,this.onClick(this.attr('item')))
        }));
    },
    onClick:function(item) {},
    _setStoreAttr:function(store) {
        this.store = store;
        this._render();
    },
    _setItemAttr:function(item) {
        this.item = item;
        this._render();
    },
    _setBindingAttr:function(binding) {
        this.binding = binding;
        this._render();
    },
    _render:function() {
        if(!this.attr('store') || !this.attr('item')) return; // nowt to renderer
        // set identity, then set all binding attrs
        dojo.attr(this.containerNode,'identity',this.attr('store').getIdentity(this.attr('item')));
        for(var attribute in this.binding) {
            var attrProps = this.binding[attribute];
            if(this[attrProps.object] && 'setAttribute' in this[attrProps.object] ) {
                dojo.attr(this[attrProps.object],attrProps.property,this.store.getValue(this.item,attribute));
            }
        }
    }
});