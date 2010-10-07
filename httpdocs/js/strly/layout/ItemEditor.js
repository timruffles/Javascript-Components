dojo.provide('strly.layout.ItemEditor');
dojo.require('strly.layout.ItemRenderer');
dojo.require('dojox.wire.DataWire');

dojo.declare('strly.layout.ItemEditor',[strly.layout.ItemRenderer],{
	
    _setItemAttr:function(item) {
        this.inherited('_setItemAttr',arguments);
        this._wire();
    },
    _setBindingAttr:function(binding) {
        this.inherited('_setBindingAttr',arguments);
        this._wire();
    },
    _setStoreAttr:function(store) {
        this.inherited('_setStoreAttr',arguments);
        this._wire();
    },
    _wire:function() {
        //console.log('wiring up');
        // bind the attribute on the wrapped item to the specified attribute on object
        var binding = this.attr('binding');
        for (var attribute in binding) {
            var attributeSetup = binding[attribute];
            if(attributeSetup.object === undefined || attributeSetup.property === undefined) {
                this._err('strly.layout.ItemEditor passed invalid binding arg ' + attribute);
            }
            if(this[attributeSetup.object] === undefined) {
                 this._err('strly.layout.ItemEditor: object ' + attributeSetup.object + ' not found');
            }
//            if(!this[attributeSetup.object][attributeSetup.property]) {
//                 this._err('strly.layout.ItemEditor: property ' + attributeSetup.property + ' not found on binding target');
//            }
            var editor = this[attributeSetup.object];
            var editorWire = {object:editor,property:attributeSetup.property};//attributeSetup.property};
            var itemWire = new dojox.wire.DataWire({dataStore: this.attr('store'),
                                                    object: this.attr('item'),
                                                    attribute: attribute});
            var cnx = new dojox.wire.connect({scope:editor,event:'change'},editorWire,itemWire);
            //console.log([attribute,attributeSetup,binding,editor,editorWire,itemWire,cnx,this.attr('store'),this.attr('item')]);

        }
    },
    _err: function(msg) {
        console.log(msg);
        throw msg;
    }
});