dojo.provide('strly.layout.tests.ItemRenderer');
dojo.require('strly.layout.ItemRenderer');
doh.register('strly.layout.ItemRenderer', [
    /**
     *
     */
    function testIdentity() {

         var res = new doh.Deferred();
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

        var setup = function(item) {
            var renderer = new strly.layout.ItemRenderer({item:item,store:testStore});
            if(dojo.attr(renderer.containerNode,'identity') === testStore.getIdentity(item)) {
                res.callback(true);
            } else  {
                res.errback("should be equal: " + dojo.attr(renderer.containerNode,'identity') + " , " + testStore.getIdentity(item));
            }

        }
        testStore.fetchItemByIdentity({identity:'Africa',onItem:setup});
        return res;
    }
]);