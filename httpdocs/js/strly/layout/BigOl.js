dojo.provide('strly.layout.BigOl');
dojo.require('strly.layout.ItemList');
dojo.require('dojo.data.ItemFileWriteStore');

dojo.declare('strly.layout.BigOl',strly.layout.ItemList,{

    _class:'strlyComponentsBigOl',
    
    prefix:'#',
    suffix:'',
    _liString:'<li class="strlyBigOlItemsLi"><div class="cnt"><span class="number"></span><div class="content"></div></div></li>',
    _renderItem:function(item) {

        var renderer = this._wrapItem(item);

        dojo.query(this.items).addContent(this._liString,'last');
        dojo.query('li:last-child',this.items).attr('identity',this.attr('store').getIdentity(item));
        dojo.query('li:last-child .content',this.items).addContent(renderer.containerNode,'last');

        this._renumber();
    },
    _removeItem: function(item) {
      this.inherited('_removeItem',arguments);
      this._renumber();
    },
    _renumber:function() {
        var self= this;
        dojo.query('.number',this.items).forEach(function(number,index) {
            number.innerHTML = self.prefix + (index + 1).toString() + self.suffix;
        });
    }
});