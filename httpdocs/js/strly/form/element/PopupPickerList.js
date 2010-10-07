dojo.provide('strly.form.element.PopupPickerList');
dojo.require('strly.layout.ItemList');
dojo.require('dijit.TooltipDialog')
dojo.require('strly.layout.ItemRenderer');

/**
 * Renders a popup with the currently selected item in a store, allows user to click to pick and then
 * closes.
 */
dojo.declare(strly.form.element.PopupPickerList,null,{
    
    // attrs
    store:null,
    selected:null,
    options:null,
    itemRendererBinding:{buttonContent:{object:'containerNode',property:'innerHTML'}},
    startup:function() {
        this.inherited('startup',arguments);

        var options = new strly.layout.ItemList({
            itemRendererParams:{binding:this.attr('itemRendererBinding')}
        });
        this.attr('options',options);
        dojo.connect('onClick',this.options,this,this._updateSelection);
    },
    show:function() {

    },
    hide:function() {

    },
    _updateSelection:function(item){
        this.attr('selected',item);
        this.hide();
    },
    _setStoreAttr:function(store) {
        this.attr('options').attr('store',store);
    },
    _getStoreAttr:function(store) {
        return this.attr('options').attr('store');
    }
});