dojo.provide('ludofy.components.ItemRenderer');
//dojo.require('');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.declare('ludofy.components.ItemRenderer',[dijit._Widget,dijit._Templated],{
    templateString:'<div dojoAttachPoint="containerNode"></div>',
    store:null,
    binding:null,
    item:null,
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
        if(!this.attr('store') || !this.attr('binding') || !this.attr('item')) return;
        for(var attribute in this.binding) {
            var attrProps = this.binding[attribute];
            if(this[attrProps.object] && 'setAttribute' in this[attrProps.object] ) {
                dojo.attr(this[attrProps.object],attribute,this.store.getValue(this.item,attribute));
            }
        }
    }
});