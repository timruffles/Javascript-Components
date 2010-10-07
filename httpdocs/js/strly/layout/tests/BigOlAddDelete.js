dojo.provide('strly.layout.tests.BigOlAddDelete');
dojo.require('strly.layout.BigOlAddDelete');
doh.register('strly.layout.tests.BigOlAddDelete', [
    /**
     * test deleteing on click
     */
    function clickRemovesFromStore(parameters) {

        var result = new doh.Deferred();
        
        var testStore = new dojo.data.ItemFileWriteStore({
            data:{ 'identifier': 'name',
          'label': 'name',
          'items': [
             { 'name':'Africa', 'type':'continent'},
             { 'name':'Egypt', 'type':'country' },
             { 'name':'Kenya', 'type':'country'},
             { 'name':'Nairobi', 'type':'city' },
             { 'name':'Mombasa', 'type':'city' }]}
        });

        var sut = new strly.layout.BigOlAddDelete({store:testStore},dojo.create('div'));
        var item = sut.attr('store').newItem({ 'name':'London', 'type':'city'});

        var row = sut.getRow(item);

        sut._onClick({target:dojo.query('.strlyBigOlAddDeleteBtn',row)[0]});

        sut.attr('store').fetch({
            onComplete:function(items){
                if(items.length == 5)
                    result.callback(true)
                else
                    result.errback("Expected 5 left after delete, but got " + items.length);
            }
        });


        return result;
    }
]);