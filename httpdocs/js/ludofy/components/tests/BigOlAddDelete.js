dojo.provide('ludofy.components.tests.BigOlAddDelete');
dojo.require('ludofy.components.BigOlAddDelete');
doh.register('ludofy.components.tests.BigOlAddDelete', [
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

        var sut = new ludofy.components.BigOlAddDelete({store:testStore},dojo.create('div'));
        var item = sut.attr('store').newItem({ 'name':'London', 'type':'city'});

        var row = sut.getRow(item);

        sut._onClick({target:dojo.query('.ludofyBigOlAddDeleteBtn',row)[0]});

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