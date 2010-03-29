dojo.provide('ludofy.components.ItemEditor');
dojo.require('ludofy.components.ItemRenderer');
dojo.require('dojox.wire.DataWire');

dojo.declare('ludofy.components.ItemEditor',[ludofy.components.ItemRenderer],{
    _setItemAttr:function(item) {
        this.inherited('_setItemAttr',arguments);
        this._wire();
    },
    _setBindingAttr:function(binding) {
        this.inherited('_setBindingAttr',arguments);
        this._wire();
    },
    _wire:function() {
        //console.log('wiring up');
        var binding = this.attr('binding');
        for (var attribute in binding) {
            var attributeSetup = binding[attribute];
            if(!attributeSetup.object || !attributeSetup.property) {
                console.log('ludofy.components.ItemEditor passed invalid binding arg ' + attribute);
                continue;
            }
            var editor = this[attributeSetup.object];
            var editorWire = {object:editor,property:attributeSetup.property};
            var itemWire = new dojox.wire.DataWire({dataStore: this.attr('store'),
                                                    object: this.attr('item'),
                                                    attribute: attribute});
            var cnx = new dojox.wire.connect({scope:editor,event:'change'},editorWire,itemWire);
            //console.log([attribute,attributeSetup,binding,editor,editorWire,itemWire,cnx,this.attr('store'),this.attr('item')]);
        }
    }
});